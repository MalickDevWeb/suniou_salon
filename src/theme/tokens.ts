import { Platform } from "react-native";

export const colors = {
  ink: "#17212b",
  sand: "#f6efe6",
  clay: "#d8b08c",
  ember: "#b85c38",
  jade: "#1f6f68",
  pine: "#13423d",
  paper: "#fffaf3",
  line: "#eadbc9",
  muted: "#6b7280",
  white: "#ffffff"
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32
};

export const radius = {
  md: 16,
  lg: 24,
  pill: 999
};

export const fontFamily = Platform.select({
  ios: "Avenir Next",
  android: "sans-serif-medium",
  default: "System"
});
