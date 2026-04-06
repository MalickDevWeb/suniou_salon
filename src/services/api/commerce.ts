import { api } from "./client";
import { Booking, Order, Product } from "../../types/domain";

export const listProducts = async (salonId?: string) => {
  const { data } = await api.get<Product[]>("/products", { params: { salonId } });
  return data;
};

export const createProductItem = async (payload: {
  salonId: string;
  name: string;
  price: number;
  stock: number;
}) => {
  const { data } = await api.post<Product>("/products", payload);
  return data;
};

export const createBooking = async (payload: {
  salonId: string;
  serviceId: string;
  startTime: string;
}) => {
  const { data } = await api.post<Booking>("/bookings", payload);
  return data;
};

export const listOrders = async () => {
  const { data } = await api.get<Order[]>("/orders/me");
  return data;
};

export const createOrder = async (
  items: Array<{ productId: string; quantity: number }>
) => {
  const { data } = await api.post<Order>("/orders", { items });
  return data;
};
