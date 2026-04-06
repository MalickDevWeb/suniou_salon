import axios from "axios";

import { useAuthStore } from "../../store/authStore";

const baseURL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || "http://10.0.2.2:3000/api";

export const api = axios.create({ baseURL, timeout: 10000 });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
