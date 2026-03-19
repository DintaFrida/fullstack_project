export async function fetchCsrfCookie() {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  if (baseUrl.endsWith("/api")) baseUrl = baseUrl.slice(0, -3);

  const url = baseUrl
    ? `${baseUrl.replace(/\/$/, "")}/sanctum/csrf-cookie`
    : "/sanctum/csrf-cookie";

  await fetch(url, {
    method: "GET",
    credentials: "include",
  });
}

