import { StyleSheet, Text } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { AuthPromptCard } from "../components/AuthPromptCard";
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

  if (!user) {
    return (
      <ScreenShell>
        <Text style={styles.kicker}>Profil</Text>
        <Text style={styles.title}>Continue comme invite, puis connecte-toi seulement quand tu en as besoin.</Text>
        <Text style={styles.subtitle}>Le profil centralise tes commandes, tes reservations et l'acces a l'espace salon.</Text>
        <AuthPromptCard
          title="Activer mon espace personnel"
          description="Connecte-toi ou cree un compte pour sauvegarder tes reservations et suivre tes commandes."
          actionLabel="Se connecter"
          onPress={() => navigation.navigate("Auth", { intent: "profile" })}
        />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Profil</Text>
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
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 34, fontWeight: "800", lineHeight: 40, marginBottom: spacing.sm },
  subtitle: { color: colors.muted, fontFamily, lineHeight: 22, marginBottom: spacing.lg },
  name: { color: colors.pine, fontFamily, fontSize: 20, fontWeight: "800", marginBottom: spacing.sm },
  line: { color: colors.ink, fontFamily, marginBottom: spacing.xs }
});
