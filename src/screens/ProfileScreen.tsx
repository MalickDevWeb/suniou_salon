import { StyleSheet, Text } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { useAuthStore } from "../store/authStore";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { MainTabParamList, RootStackParamList } from "../navigation/types";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Profile">,
  NativeStackScreenProps<RootStackParamList>
>;

export const ProfileScreen = ({ navigation }: Props) => {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  return (
    <ScreenShell>
      <Text style={styles.title}>Mon profil</Text>
      <SectionCard>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.line}>{user?.email}</Text>
        <Text style={styles.line}>Role: {user?.role}</Text>
      </SectionCard>
      {user?.role === "SALON" && (
        <PrimaryButton label="Ouvrir l'espace salon" onPress={() => navigation.navigate("SalonWorkspace")} />
      )}
      <PrimaryButton label="Se deconnecter" onPress={clearSession} tone="secondary" />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  title: { color: colors.ink, fontFamily, fontSize: 28, fontWeight: "800", marginBottom: spacing.lg },
  name: { color: colors.pine, fontFamily, fontSize: 20, fontWeight: "800", marginBottom: spacing.sm },
  line: { color: colors.ink, fontFamily, marginBottom: spacing.xs }
});
