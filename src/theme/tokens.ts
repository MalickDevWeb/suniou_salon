import { Platform } from "react-native";

export const colors = {
  ink: "#1b1a21",
  sand: "#f6efe6",
  clay: "#d8b08c",
  ember: "#b85c38",
  jade: "#1f6f68",
  pine: "#163b38",
  paper: "#fffaf5",
  line: "#eadbc9",
  muted: "#6f6b67",
  white: "#ffffff",
  blush: "#f5ddd0",
  mist: "#f1ebe3",
  gold: "#8a5a32",
  night: "#11211f",
  charcoal: "#27272f",
  steel: "#343944",
  rosewood: "#70505a",
  champagne: "#d9c2aa",
  success: "#2c6f60",
  shadow: "rgba(37, 24, 10, 0.12)"
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40
};

export const radius = {
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999
};

export const fontFamily = Platform.select({
  ios: "Avenir Next",
  android: "sans-serif-medium",
  default: "System"
});
