import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "../theme/tokens";

export const LoadingView = ({ label }: { label: string }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.pine} />
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.sand,
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg
  },
  label: {
    color: colors.ink,
    fontFamily,
    marginTop: spacing.md
  }
});
