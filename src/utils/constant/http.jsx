import axios from "axios";

// Membuat instance axios dengan baseURL dan headers default
const http = axios.create({
  baseURL: "/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default http;