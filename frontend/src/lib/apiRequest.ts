export type ApiErrorBody = {
  message?: string;
  error?: string;
  errors?: Array<{ field?: string; message: string }> | Record<string, string[]>;
};

export class ApiError extends Error {
  public status?: number;
  public body?: ApiErrorBody;

  constructor(message: string, opts?: { status?: number; body?: ApiErrorBody }) {
    super(message);
    this.name = "ApiError";
    this.status = opts?.status;
    this.body = opts?.body;
  }
}

function buildUrl(path: string) {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  // Support both "http://host:port" and "http://host:port/api" env formats.
  if (baseUrl.endsWith("/api")) baseUrl = baseUrl.slice(0, -3);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!baseUrl) return normalizedPath;
  const trimmedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${trimmedBase}${normalizedPath}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length < 2) return undefined;
  const part = parts.pop();
  if (!part) return undefined;
  return part.split(";").shift();
}

export async function apiRequest<T>(
  path: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    signal?: AbortSignal;
    headers?: Record<string, string>;
  },
): Promise<T> {
  const url = buildUrl(path);
  const method = options?.method ?? "GET";
  const xsrfToken =
    method !== "GET" && method !== "HEAD" ? getCookie("XSRF-TOKEN") : undefined;

  const res = await fetch(url, {
    method,
    credentials: "include", // required for Laravel session cookie
    headers: {
      "Content-Type": "application/json",
      ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
      ...(options?.headers ?? {}),
    },
    body:
      options?.body === undefined
        ? undefined
        : JSON.stringify(options.body),
    signal: options?.signal,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  const data = isJson ? ((await res.json()) as ApiErrorBody & { data?: unknown; meta?: unknown }) : null;

  if (!res.ok) {
    const message =
      data?.message ??
      data?.error ??
      `Request failed with status ${res.status}`;
    throw new ApiError(message, { status: res.status, body: data ?? undefined });
  }

  // Prefer { data: ... } envelope if backend uses it.
  if (data && typeof (data as any).data !== "undefined") return (data as any).data as T;
  return (data as any as T) ?? (undefined as T);
}

