import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppField } from "../components/AppField";
import { PrimaryButton } from "../components/PrimaryButton";
import { RoleSwitch } from "../components/RoleSwitch";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { getCurrentUser, loginUser, registerUser } from "../services/api/auth";
import { useAuthStore } from "../store/authStore";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { UserRole } from "../types/domain";

export const AuthScreen = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<UserRole>("CLIENT");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      const normalizedEmail = email.trim().toLowerCase();
      if (mode === "register") {
        await registerUser({ name, email: normalizedEmail, password, role });
      }
      const session = await loginUser({ email: normalizedEmail, password });
      setSession(session.token, await getCurrentUser());
    } catch (currentError) {
      setError("Connexion impossible. Verifie les informations et l'API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Suniou Salon</Text>
      <Text style={styles.title}>Reserve, commande et pilote ton salon depuis le mobile.</Text>
      <SectionCard>
        {mode === "register" && <AppField label="Nom" value={name} onChangeText={setName} />}
        <AppField label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" />
        <AppField label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
        {mode === "register" && <RoleSwitch value={role} onChange={setRole} />}
        {!!error && <Text style={styles.error}>{error}</Text>}
        <PrimaryButton
          label={mode === "login" ? "Se connecter" : "Creer un compte"}
          onPress={submit}
          loading={loading}
        />
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
  title: { color: colors.ink, fontFamily, fontSize: 30, fontWeight: "800", marginBottom: spacing.lg },
  error: { color: colors.ember, marginBottom: spacing.sm },
  switcher: { flexDirection: "row", marginTop: spacing.md },
  muted: { color: colors.muted, fontFamily },
  link: { color: colors.pine, fontFamily, fontWeight: "700" }
});
