import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";

import { LoadingView } from "../components/LoadingView";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { listSalons, getNearbySalons } from "../services/api/salons";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { SalonSummary } from "../types/domain";
import { getCurrentCoordinates } from "../utils/location";
import { MainTabParamList, RootStackParamList } from "../navigation/types";

const CACHE_KEY = "suniou-nearby-cache";
type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Home">,
  NativeStackScreenProps<RootStackParamList>
>;

export const HomeScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(true);
  const [salons, setSalons] = useState<SalonSummary[]>([]);
  const [message, setMessage] = useState("Chargement des salons proches...");

  useEffect(() => {
    AsyncStorage.getItem(CACHE_KEY).then((raw) => raw && setSalons(JSON.parse(raw)));
    const load = async () => {
      const coords = await getCurrentCoordinates();
      const nextSalons = coords
        ? await getNearbySalons(coords.latitude, coords.longitude)
        : await listSalons();
      setMessage(coords ? "Autour de toi" : "Localisation refusee, liste complete");
      setSalons(nextSalons);
      AsyncStorage.setItem(CACHE_KEY, JSON.stringify(nextSalons));
      setLoading(false);
    };
    load().catch(() => setLoading(false));
  }, []);

  if (loading && salons.length === 0) return <LoadingView label={message} />;

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Accueil</Text>
      <Text style={styles.title}>Des salons selectionnes pour les reseaux lents et les mobiles rapides.</Text>
      <Text style={styles.subtitle}>{message}</Text>
      {salons.map((entry) => (
        <Pressable key={entry.salon.id} onPress={() => navigation.navigate("SalonDetails", { salon: entry })}>
          <SectionCard>
            <Text style={styles.salon}>{entry.salon.name}</Text>
            <Text style={styles.address}>{entry.salon.address}</Text>
            <Text style={styles.meta}>
              {entry.services.length} services · {Math.round(entry.distanceKm ?? 0)} km
            </Text>
          </SectionCard>
        </Pressable>
      ))}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 28, fontWeight: "800", marginBottom: spacing.sm },
  subtitle: { color: colors.muted, fontFamily, marginBottom: spacing.lg },
  salon: { color: colors.ink, fontFamily, fontSize: 20, fontWeight: "800", marginBottom: spacing.xs },
  address: { color: colors.muted, fontFamily, marginBottom: spacing.sm },
  meta: { color: colors.pine, fontFamily, fontWeight: "700" }
});
