import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import { AppField } from "../components/AppField";
import { AuthPromptCard } from "../components/AuthPromptCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { createBooking } from "../services/api/commerce";
import { useAuthStore } from "../store/authStore";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { formatXof } from "../utils/currency";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Booking">;

export const BookingScreen = ({ route, navigation }: Props) => {
  const { salon, service } = route.params;
  const token = useAuthStore((state) => state.token);
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  const [startTime, setStartTime] = useState(tomorrow);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!token) {
      Alert.alert("Connexion requise", "Connecte-toi pour confirmer ce rendez-vous.");
      navigation.navigate("Auth", {
        intent: "booking",
        title: "Derniere etape avant la reservation",
        message: "Tu as deja choisi ton service. Connecte-toi seulement pour enregistrer ce rendez-vous."
      });
      return;
    }

    const parsedDate = new Date(startTime);
    if (Number.isNaN(parsedDate.getTime())) {
      Alert.alert("Date invalide", "Utilise le format 2026-04-10T10:00.");
      return;
    }

    try {
      setLoading(true);
      await createBooking({
        salonId: salon.salon.id,
        serviceId: service.id,
        startTime: parsedDate.toISOString()
      });
      Alert.alert("Reservation creee", "Ton rendez-vous a bien ete enregistre.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Reservation</Text>
      <Text style={styles.title}>{service.name}</Text>
      <Text style={styles.subtitle}>Choisis ton creneau puis confirme au dernier moment avec ton compte.</Text>
      <LinearGradient
        colors={[colors.night, colors.charcoal, colors.rosewood]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.summaryCard}
      >
        <Text style={styles.summaryLabel}>Salon</Text>
        <Text style={styles.summaryValue}>{salon.salon.name}</Text>
        <Text style={styles.summaryMeta}>
          {formatXof(service.price)} · {service.durationMinutes} min
        </Text>
        <Text style={styles.summaryAddress}>{salon.salon.address}</Text>
      </LinearGradient>
      <SectionCard>
        <AppField
          label="Date et heure"
          value={startTime}
          onChangeText={setStartTime}
          placeholder="2026-04-10T10:00"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.helper}>Format attendu: 2026-04-10T10:00</Text>
        <PrimaryButton
          label={token ? "Confirmer la reservation" : "Se connecter pour confirmer"}
          onPress={submit}
          loading={loading}
        />
      </SectionCard>
      {!token && (
        <AuthPromptCard
          title="Tu peux tout parcourir sans compte."
          description="La connexion est demandee uniquement pour enregistrer ton rendez-vous et le retrouver ensuite."
          actionLabel="Se connecter maintenant"
          onPress={() => navigation.navigate("Auth", { intent: "booking" })}
        />
      )}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 34, fontWeight: "800", lineHeight: 40, marginBottom: spacing.xs },
  subtitle: { color: colors.muted, fontFamily, lineHeight: 22, marginBottom: spacing.lg },
  summaryCard: {
    borderRadius: 28,
    marginBottom: spacing.md,
    overflow: "hidden",
    padding: spacing.xl
  },
  summaryLabel: { color: colors.champagne, fontFamily, fontSize: 12, fontWeight: "700", marginBottom: spacing.xs, textTransform: "uppercase" },
  summaryValue: { color: colors.white, fontFamily, fontSize: 22, fontWeight: "800", marginBottom: spacing.xs },
  summaryMeta: { color: colors.champagne, fontFamily, fontWeight: "700", marginBottom: spacing.xs },
  summaryAddress: { color: "rgba(255, 250, 245, 0.82)", fontFamily },
  helper: { color: colors.muted, fontFamily, marginBottom: spacing.md }
});
