import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const token = isAdminRoute
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    if (error.response?.status === 401) {
      if (isAdminRoute) {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      } else {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default http;