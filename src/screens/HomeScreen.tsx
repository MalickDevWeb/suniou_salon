import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

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

  const totalServices = salons.reduce(
    (sum, entry) => sum + entry.services.length,
    0
  );
  const closest = salons
    .map((entry) => entry.distanceKm)
    .filter((distance): distance is number => typeof distance === "number")
    .sort((left, right) => left - right)[0];

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Selection mobile</Text>
      <Text style={styles.title}>Des salons jolis, rapides a charger, et prets pour reserver en quelques tapes.</Text>
      <Text style={styles.subtitle}>{message}</Text>
      <LinearGradient
        colors={[colors.night, colors.charcoal, colors.rosewood]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroPanel}
      >
        <Text style={styles.heroKicker}>Ambiance studio</Text>
        <Text style={styles.heroTitle}>Une vitrine plus premium, inspiree des salons elegants et des details bien cadres.</Text>
        <Text style={styles.heroText}>
          Explore sans compte, compare les prestations et connecte-toi seulement a la derniere etape pour confirmer.
        </Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{salons.length}</Text>
            <Text style={styles.metricLabel}>salons</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>{totalServices}</Text>
            <Text style={styles.metricLabel}>services</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricValue}>
              {typeof closest === "number" ? `${Math.max(1, Math.round(closest))} km` : "Live"}
            </Text>
            <Text style={styles.metricLabel}>autour de toi</Text>
          </View>
        </View>
      </LinearGradient>
      <Text style={styles.sectionTitle}>Salons disponibles</Text>
      {salons.map((entry) => (
        <Pressable
          key={entry.salon.id}
          onPress={() => navigation.navigate("SalonDetails", { salon: entry })}
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <SectionCard style={styles.salonCard}>
            <LinearGradient
              colors={[colors.charcoal, colors.steel]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.salonBanner}
            >
              <View style={styles.cardHeader}>
                <View style={styles.identityPill}>
                  <Text style={styles.identityText}>SN</Text>
                </View>
                <Text style={styles.distance}>
                  {typeof entry.distanceKm === "number"
                    ? `${Math.max(1, Math.round(entry.distanceKm))} km`
                    : "Liste complete"}
                </Text>
              </View>
              <Text style={styles.bannerTitle}>Cadre soigne, lumiere maitrisee, services visibles tout de suite.</Text>
            </LinearGradient>
            <Text style={styles.salon}>{entry.salon.name}</Text>
            <Text style={styles.address}>{entry.salon.address}</Text>
            <View style={styles.tagsWrap}>
              {entry.services.slice(0, 4).map((service) => (
                <View key={service.id} style={styles.tag}>
                  <Text style={styles.tagText}>{service.name}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.meta}>
              {entry.services.length} services a decouvrir
            </Text>
            <Text style={styles.cta}>Voir tous les services</Text>
          </SectionCard>
        </Pressable>
      ))}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 34, fontWeight: "800", lineHeight: 40, marginBottom: spacing.sm },
  subtitle: { color: colors.muted, fontFamily, fontSize: 16, marginBottom: spacing.lg },
  heroPanel: {
    borderRadius: 28,
    marginBottom: spacing.lg,
    overflow: "hidden",
    padding: spacing.xl
  },
  heroKicker: { color: colors.champagne, fontFamily, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: spacing.sm, textTransform: "uppercase" },
  heroTitle: { color: colors.white, fontFamily, fontSize: 28, fontWeight: "800", lineHeight: 34, marginBottom: spacing.sm },
  heroText: { color: "rgba(255, 250, 245, 0.82)", fontFamily, lineHeight: 22, marginBottom: spacing.md },
  metricsRow: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 },
  metricBox: {
    backgroundColor: "rgba(255, 250, 245, 0.12)",
    borderRadius: 18,
    marginHorizontal: 6,
    marginBottom: spacing.sm,
    minWidth: 104,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  metricValue: { color: colors.white, fontFamily, fontSize: 20, fontWeight: "800", marginBottom: 2 },
  metricLabel: { color: colors.champagne, fontFamily, fontSize: 12, textTransform: "uppercase" },
  sectionTitle: { color: colors.gold, fontFamily, fontSize: 13, fontWeight: "700", letterSpacing: 0.8, marginBottom: spacing.sm, textTransform: "uppercase" },
  pressed: { opacity: 0.96, transform: [{ scale: 0.995 }] },
  salonCard: { backgroundColor: colors.white },
  salonBanner: {
    borderRadius: 18,
    marginBottom: spacing.md,
    padding: spacing.md
  },
  cardHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.md },
  identityPill: {
    alignItems: "center",
    backgroundColor: "rgba(245, 221, 208, 0.16)",
    borderRadius: 18,
    justifyContent: "center",
    minWidth: 52,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  identityText: { color: colors.champagne, fontFamily, fontWeight: "800" },
  distance: { color: colors.champagne, fontFamily, fontWeight: "700" },
  bannerTitle: { color: colors.white, fontFamily, fontSize: 16, fontWeight: "700", lineHeight: 22 },
  salon: { color: colors.ink, fontFamily, fontSize: 22, fontWeight: "800", marginBottom: spacing.xs },
  address: { color: colors.muted, fontFamily, lineHeight: 21, marginBottom: spacing.md },
  tagsWrap: { flexDirection: "row", flexWrap: "wrap", marginBottom: spacing.md, marginHorizontal: -4 },
  tag: {
    backgroundColor: colors.mist,
    borderRadius: 16,
    marginHorizontal: 4,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6
  },
  tagText: { color: colors.ink, fontFamily, fontSize: 12, fontWeight: "700" },
  meta: { color: colors.gold, fontFamily, fontWeight: "700", marginBottom: spacing.xs },
  cta: { color: colors.pine, fontFamily, fontWeight: "800" }
});
