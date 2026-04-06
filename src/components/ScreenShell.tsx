import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { colors, spacing } from "../theme/tokens";

type Props = {
  children: ReactNode;
};

export const ScreenShell = ({ children }: Props) => (
  <LinearGradient
    colors={[colors.sand, "#f9f4ee", "#f2e6d7"]}
    style={styles.container}
  >
    <ScrollView contentContainerStyle={styles.content}>
      <View>{children}</View>
    </ScrollView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl
  }
});
