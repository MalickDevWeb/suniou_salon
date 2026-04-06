import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { listProducts } from "../services/api/commerce";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { Product } from "../types/domain";
import { formatXof } from "../utils/currency";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "SalonDetails">;

export const SalonDetailsScreen = ({ route, navigation }: Props) => {
  const { salon } = route.params;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    listProducts(salon.salon.id).then(setProducts).catch(() => undefined);
  }, [salon.salon.id]);

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Fiche salon</Text>
      <Text style={styles.title}>{salon.salon.name}</Text>
      <Text style={styles.subtitle}>{salon.salon.address}</Text>
      <LinearGradient
        colors={[colors.night, colors.charcoal, colors.rosewood]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >
        <Text style={styles.heroKicker}>Signature salon</Text>
        <Text style={styles.heroTitle}>Tous les services sont visibles ici avant la connexion.</Text>
        <View style={styles.statGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{salon.services.length}</Text>
            <Text style={styles.statLabel}>services</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {typeof salon.distanceKm === "number" ? `${Math.max(1, Math.round(salon.distanceKm))} km` : "Mobile"}
            </Text>
            <Text style={styles.statLabel}>distance</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{products.length}</Text>
            <Text style={styles.statLabel}>produits</Text>
          </View>
        </View>
      </LinearGradient>
      <Text style={styles.heading}>Tous les services</Text>
      {salon.services.map((service) => (
        <Pressable key={service.id} onPress={() => navigation.navigate("Booking", { salon, service })}>
          <SectionCard style={styles.serviceCard}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceMeta}>
              {formatXof(service.price)} · {service.durationMinutes} min
            </Text>
            <Text style={styles.serviceCta}>Reserver ce service</Text>
          </SectionCard>
        </Pressable>
      ))}
      <Text style={styles.heading}>Produits en boutique</Text>
      <SectionCard>
        {products.length === 0 && <Text style={styles.empty}>Aucun produit disponible pour le moment.</Text>}
        {products.map((product) => (
          <View key={product.id} style={styles.productRow}>
            <View style={styles.productColumn}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productMeta}>Stock {product.stock}</Text>
            </View>
            <Text style={styles.productPrice}>{formatXof(product.price)}</Text>
          </View>
        ))}
      </SectionCard>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 34, fontWeight: "800", lineHeight: 40, marginBottom: spacing.xs },
  subtitle: { color: colors.muted, fontFamily, lineHeight: 22, marginBottom: spacing.lg },
  heroCard: {
    borderRadius: 28,
    marginBottom: spacing.lg,
    overflow: "hidden",
    padding: spacing.xl
  },
  heroKicker: { color: colors.champagne, fontFamily, fontSize: 12, fontWeight: "700", letterSpacing: 1, marginBottom: spacing.sm, textTransform: "uppercase" },
  heroTitle: { color: colors.white, fontFamily, fontSize: 24, fontWeight: "800", lineHeight: 30, marginBottom: spacing.md },
  statGrid: { flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 },
  statBox: {
    backgroundColor: "rgba(255, 250, 245, 0.12)",
    borderRadius: 18,
    marginHorizontal: 6,
    marginBottom: spacing.sm,
    minWidth: 104,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  statValue: { color: colors.white, fontFamily, fontSize: 22, fontWeight: "800", marginBottom: 2 },
  statLabel: { color: colors.champagne, fontFamily, fontSize: 12, textTransform: "uppercase" },
  heading: { color: colors.gold, fontFamily, fontSize: 13, fontWeight: "700", letterSpacing: 0.8, marginBottom: spacing.sm, textTransform: "uppercase" },
  serviceCard: { backgroundColor: colors.white },
  serviceName: { color: colors.ink, fontFamily, fontSize: 20, fontWeight: "800", marginBottom: spacing.xs },
  serviceMeta: { color: colors.muted, fontFamily, marginBottom: spacing.sm },
  serviceCta: { color: colors.pine, fontFamily, fontWeight: "800" },
  empty: { color: colors.muted, fontFamily },
  productRow: {
    alignItems: "center",
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm
  },
  productColumn: { flex: 1, paddingRight: spacing.md },
  productName: { color: colors.ink, fontFamily, fontWeight: "800", marginBottom: 2 },
  productMeta: { color: colors.muted, fontFamily, fontSize: 13 },
  productPrice: { color: colors.gold, fontFamily, fontWeight: "800" }
});
