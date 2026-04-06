import { api } from "./client";
import { Booking, SalonRecord, SalonSummary, ServiceItem } from "../../types/domain";

export const listSalons = async () => {
  const { data } = await api.get<SalonSummary[]>("/salons");
  return data;
};

export const getNearbySalons = async (lat: number, lon: number) => {
  const { data } = await api.get<SalonSummary[]>("/salons/nearby", {
    params: { lat, lon, radius: 10 }
  });
  return data;
};

export const createSalonProfile = async (payload: Omit<SalonRecord, "id" | "ownerId">) => {
  const { data } = await api.post<SalonRecord>("/salons", payload);
  return data;
};

export const getMySalon = async () => {
  const { data } = await api.get<SalonRecord | null>("/salons/me");
  return data;
};

export const createServiceItem = async (payload: {
  salonId: string;
  name: string;
  price: number;
  durationMinutes: number;
}) => {
  const { data } = await api.post<ServiceItem>("/services", payload);
  return data;
};

export const listOwnerBookings = async () => {
  const { data } = await api.get<Booking[]>("/salons/me/bookings");
  return data;
};
