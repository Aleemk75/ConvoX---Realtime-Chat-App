import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api" || "https://convox-realtime-chat-app-backend.onrender.com",
  withCredentials: true,
});
