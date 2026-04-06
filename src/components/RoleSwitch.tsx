import { Pressable, StyleSheet, Text, View } from "react-native";

import { UserRole } from "../types/domain";
import { colors, fontFamily, radius, spacing } from "../theme/tokens";

type Props = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

const roles: UserRole[] = ["CLIENT", "SALON"];

export const RoleSwitch = ({ value, onChange }: Props) => (
  <View style={styles.row}>
    {roles.map((role) => (
      <Pressable
        key={role}
        onPress={() => onChange(role)}
        style={[styles.pill, value === role && styles.active]}
      >
        <Text style={[styles.label, value === role && styles.activeLabel]}>{role}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.md },
  pill: {
    borderColor: colors.line,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  active: { backgroundColor: colors.pine, borderColor: colors.pine },
  label: { color: colors.ink, fontFamily, fontSize: 13, fontWeight: "700" },
  activeLabel: { color: colors.white }
});
