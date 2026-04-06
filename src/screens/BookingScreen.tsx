import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppField } from "../components/AppField";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { createBooking } from "../services/api/commerce";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { formatXof } from "../utils/currency";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Booking">;

export const BookingScreen = ({ route, navigation }: Props) => {
  const { salon, service } = route.params;
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
  const [startTime, setStartTime] = useState(tomorrow);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await createBooking({ salonId: salon.salon.id, serviceId: service.id, startTime: new Date(startTime).toISOString() });
      Alert.alert("Reservation creee", "Ton rendez-vous a bien ete enregistre.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell>
      <Text style={styles.title}>Reserver {service.name}</Text>
      <SectionCard>
        <Text style={styles.summary}>{salon.salon.name}</Text>
        <Text style={styles.summary}>{formatXof(service.price)} · {service.durationMinutes} min</Text>
        <AppField label="Date et heure" value={startTime} onChangeText={setStartTime} placeholder="2026-04-10T10:00" />
        <PrimaryButton label="Confirmer la reservation" onPress={submit} loading={loading} />
      </SectionCard>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  title: { color: colors.ink, fontFamily, fontSize: 28, fontWeight: "800", marginBottom: spacing.lg },
  summary: { color: colors.ink, fontFamily, marginBottom: spacing.sm }
});
