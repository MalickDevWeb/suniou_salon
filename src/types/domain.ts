export type UserRole = "CLIENT" | "SALON" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type SalonRecord = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  ownerId: string;
};

export type ServiceItem = {
  id: string;
  salonId: string;
  name: string;
  price: number;
  durationMinutes: number;
};

export type SalonSummary = {
  salon: SalonRecord;
  services: ServiceItem[];
  distanceKm?: number;
};

export type Product = {
  id: string;
  salonId: string;
  name: string;
  price: number;
  stock: number;
  isActive: boolean;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
};

export type Booking = {
  id: string;
  salonId: string;
  serviceId: string;
  startTime: string;
  endTime: string;
  status: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
