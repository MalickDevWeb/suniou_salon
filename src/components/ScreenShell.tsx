import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { colors, radius, spacing } from "../theme/tokens";

type Props = {
  children: ReactNode;
};

export const ScreenShell = ({ children }: Props) => (
  <LinearGradient
    colors={[colors.paper, "#f1e6d7", "#edd7c1"]}
    style={styles.container}
  >
    <View style={styles.orbLarge} />
    <View style={styles.orbSmall} />
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  orbLarge: {
    position: "absolute",
    top: -90,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: radius.pill,
    backgroundColor: "rgba(216, 176, 140, 0.32)"
  },
  orbSmall: {
    position: "absolute",
    top: 160,
    left: -70,
    width: 180,
    height: 180,
    borderRadius: radius.pill,
    backgroundColor: "rgba(31, 111, 104, 0.10)"
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl
  },
  inner: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 960
  }
});
