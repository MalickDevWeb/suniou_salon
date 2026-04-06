import { SalonSummary, ServiceItem } from "../types/domain";

export type MainTabParamList = {
  Home: undefined;
  Shop: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type AuthIntent =
  | "booking"
  | "checkout"
  | "orders"
  | "profile"
  | "workspace";

export type RootStackParamList = {
  Auth:
    | {
        intent?: AuthIntent;
        title?: string;
        message?: string;
      }
    | undefined;
  Main: undefined;
  SalonDetails: { salon: SalonSummary };
  Booking: { salon: SalonSummary; service: ServiceItem };
  SalonWorkspace: undefined;
};
