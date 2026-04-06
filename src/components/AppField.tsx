import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

import { colors, fontFamily, radius, spacing } from "../theme/tokens";

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoCorrect?: boolean;
};

export const AppField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect
}: Props) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
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
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.ink,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontFamily
  }
});
