import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors, radius, spacing } from "../theme/tokens";

type Props = {
  children: ReactNode;
};

export const SectionCard = ({ children }: Props) => (
  <View style={styles.card}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.lg
  }
});
