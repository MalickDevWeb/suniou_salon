import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors, fontFamily, radius, spacing } from "../theme/tokens";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  tone?: "primary" | "secondary";
};

export const PrimaryButton = ({
  label,
  onPress,
  loading,
  tone = "primary"
}: Props) => (
  <Pressable
    disabled={loading}
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      tone === "secondary" ? styles.secondary : styles.primary,
      pressed && styles.pressed,
      loading && styles.disabled
    ]}
  >
    {loading ? (
      <ActivityIndicator color={tone === "secondary" ? colors.ink : colors.white} />
    ) : (
      <Text style={[styles.label, tone === "secondary" ? styles.ink : styles.white]}>
        {label}
      </Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: "stretch",
    alignItems: "center",
    borderRadius: radius.pill,
    minHeight: 52,
    justifyContent: "center",
    paddingHorizontal: spacing.lg
  },
  primary: { backgroundColor: colors.pine },
  secondary: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.94 },
  disabled: { opacity: 0.75 },
  label: { fontFamily, fontSize: 16, fontWeight: "700" },
  white: { color: colors.white },
  ink: { color: colors.ink }
});
