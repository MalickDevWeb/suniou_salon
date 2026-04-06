import { SalonSummary, ServiceItem } from "../types/domain";

export type MainTabParamList = {
  Home: undefined;
  Shop: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  SalonDetails: { salon: SalonSummary };
  Booking: { salon: SalonSummary; service: ServiceItem };
  SalonWorkspace: undefined;
};
