import { api } from "./client";
import { User, UserRole } from "../../types/domain";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) => {
  await api.post("/auth/register", payload);
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post<{ token: string }>("/auth/login", payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};
