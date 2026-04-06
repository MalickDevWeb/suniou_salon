import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { colors, radius, spacing } from "../theme/tokens";

type Props = {
  children: ReactNode;
};

export const ScreenShell = ({ children }: Props) => (
  <LinearGradient
    colors={[colors.ivory, colors.powder, "#efe4e6"]}
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
    backgroundColor: "rgba(200, 143, 159, 0.20)"
  },
  orbSmall: {
    position: "absolute",
    top: 160,
    left: -70,
    width: 180,
    height: 180,
    borderRadius: radius.pill,
    backgroundColor: "rgba(216, 209, 215, 0.45)"
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
