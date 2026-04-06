import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppField } from "../components/AppField";
import { PrimaryButton } from "../components/PrimaryButton";
import { RoleSwitch } from "../components/RoleSwitch";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { getCurrentUser, loginUser, registerUser } from "../services/api/auth";
import { useAuthStore } from "../store/authStore";
import { colors, fontFamily, radius, spacing } from "../theme/tokens";
import { UserRole } from "../types/domain";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

const intentCopy = {
  booking: {
    kicker: "Connexion rapide",
    title: "Connecte-toi pour confirmer ta reservation.",
    description: "Tu peux parcourir les salons librement. La connexion n'est demandee qu'au moment d'enregistrer le rendez-vous."
  },
  checkout: {
    kicker: "Finaliser la commande",
    title: "Identifie-toi pour valider ton panier.",
    description: "Ton panier reste visible. Une session est necessaire seulement pour creer la commande."
  },
  orders: {
    kicker: "Historique client",
    title: "Connecte-toi pour suivre tes commandes.",
    description: "Retrouve tes achats, statuts et montants depuis ton espace personnel."
  },
  profile: {
    kicker: "Espace personnel",
    title: "Connecte-toi pour retrouver ton compte.",
    description: "Ton profil donne acces a tes commandes, reservations et informations de salon."
  },
  workspace: {
    kicker: "Espace salon",
    title: "Connecte-toi avec un compte salon.",
    description: "L'espace salon permet de gerer tes services, tes produits et les reservations recues."
  }
} as const;

export const AuthScreen = ({ navigation, route }: Props) => {
  const setSession = useAuthStore((state) => state.setSession);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<UserRole>("CLIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const copy =
    route.params?.intent ? intentCopy[route.params.intent] : undefined;

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      const normalizedEmail = email.trim().toLowerCase();
      if (mode === "register") {
        await registerUser({ name, email: normalizedEmail, password, role });
      }
      const session = await loginUser({ email: normalizedEmail, password });
      const user = await getCurrentUser();
      setSession(session.token, user);
      if (route.params?.intent === "workspace" && user.role === "SALON") {
        navigation.replace("SalonWorkspace");
        return;
      }
      if (navigation.canGoBack()) {
        navigation.goBack();
        return;
      }
      navigation.navigate("Main");
    } catch (currentError) {
      setError("Connexion impossible. Verifie les informations et l'API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell>
      <Text style={styles.kicker}>{route.params?.title ?? copy?.kicker ?? "Suniou Salon"}</Text>
      <Text style={styles.title}>{copy?.title ?? "Reserve, commande et pilote ton salon depuis le mobile."}</Text>
      <Text style={styles.subtitle}>
        {route.params?.message ?? copy?.description ?? "Explore les services, reserve un creneau et active ton espace salon depuis une interface simple."}
      </Text>
      <SectionCard style={styles.demoCard}>
        <Text style={styles.demoTitle}>Comptes de demo</Text>
        <View style={styles.demoRow}>
          <View style={styles.demoBadge}>
            <Text style={styles.demoLabel}>Client</Text>
            <Text style={styles.demoValue}>client@suniou.app</Text>
          </View>
          <View style={styles.demoBadge}>
            <Text style={styles.demoLabel}>Salon</Text>
            <Text style={styles.demoValue}>owner@suniou.app</Text>
          </View>
        </View>
        <Text style={styles.demoPassword}>Mot de passe: Password123!</Text>
      </SectionCard>
      <SectionCard>
        {mode === "register" && <AppField label="Nom" value={name} onChangeText={setName} />}
        <AppField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <AppField
          label="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        {mode === "register" && <RoleSwitch value={role} onChange={setRole} />}
        {!!error && <Text style={styles.error}>{error}</Text>}
        <PrimaryButton
          label={mode === "login" ? "Se connecter" : "Creer un compte"}
          onPress={submit}
          loading={loading}
        />
        {navigation.canGoBack() && (
          <View style={styles.secondaryAction}>
            <PrimaryButton label="Continuer plus tard" onPress={() => navigation.goBack()} tone="secondary" />
          </View>
        )}
        <View style={styles.switcher}>
          <Text style={styles.muted}>
            {mode === "login" ? "Pas encore de compte ?" : "Deja inscrit ?"}
          </Text>
          <Text style={styles.link} onPress={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? " Creer un compte" : " Me connecter"}
          </Text>
        </View>
      </SectionCard>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontSize: 14, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 32, fontWeight: "800", marginBottom: spacing.sm, lineHeight: 38 },
  subtitle: { color: colors.muted, fontFamily, fontSize: 16, lineHeight: 24, marginBottom: spacing.lg },
  demoCard: { backgroundColor: colors.white, borderColor: colors.blush },
  demoTitle: { color: colors.gold, fontFamily, fontWeight: "800", marginBottom: spacing.sm },
  demoRow: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -4 },
  demoBadge: {
    backgroundColor: colors.mist,
    borderRadius: radius.md,
    marginHorizontal: 4,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  demoLabel: { color: colors.ember, fontFamily, fontSize: 12, fontWeight: "700", marginBottom: 2 },
  demoValue: { color: colors.ink, fontFamily, fontWeight: "700" },
  demoPassword: { color: colors.muted, fontFamily },
  error: { color: colors.ember, marginBottom: spacing.sm },
  secondaryAction: { marginTop: spacing.sm },
  switcher: { flexDirection: "row", marginTop: spacing.md },
  muted: { color: colors.muted, fontFamily },
  link: { color: colors.pine, fontFamily, fontWeight: "700" }
});
