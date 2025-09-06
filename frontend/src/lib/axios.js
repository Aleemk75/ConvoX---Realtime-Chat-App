import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://convox-realtime-chat-app-backend.onrender.com",
  withCredentials: true,
});
