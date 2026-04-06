import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { colors, radius, spacing } from "../theme/tokens";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const SectionCard = ({ children, style }: Props) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 250, 245, 0.94)",
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg,
    shadowColor: colors.night,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4
  }
});
