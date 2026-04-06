import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "../theme/tokens";

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
};

export const AppField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}: Props) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.md },
  label: {
    color: colors.ink,
    fontFamily,
    fontSize: 13,
    marginBottom: spacing.xs
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.ink,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  }
});
