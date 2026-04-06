import axios from "axios";
import { Platform } from "react-native";

import { useAuthStore } from "../../store/authStore";

const fallbackBaseURL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3001/api"
    : "http://127.0.0.1:3001/api";

export const baseURL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || fallbackBaseURL;

export const api = axios.create({ baseURL, timeout: 10000 });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
