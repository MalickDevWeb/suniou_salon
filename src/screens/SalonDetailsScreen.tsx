import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
      <Text style={styles.title}>{salon.salon.name}</Text>
      <Text style={styles.subtitle}>{salon.salon.address}</Text>
      <SectionCard>
        <Text style={styles.heading}>Services</Text>
        {salon.services.map((service) => (
          <Pressable key={service.id} onPress={() => navigation.navigate("Booking", { salon, service })}>
            <Text style={styles.row}>{service.name} · {formatXof(service.price)} · {service.durationMinutes} min</Text>
          </Pressable>
        ))}
      </SectionCard>
      <SectionCard>
        <Text style={styles.heading}>Produits vedettes</Text>
        {products.slice(0, 3).map((product) => (
          <Text key={product.id} style={styles.row}>
            {product.name} · {formatXof(product.price)}
          </Text>
        ))}
      </SectionCard>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  title: { color: colors.ink, fontFamily, fontSize: 28, fontWeight: "800", marginBottom: spacing.xs },
  subtitle: { color: colors.muted, fontFamily, marginBottom: spacing.lg },
  heading: { color: colors.pine, fontFamily, fontSize: 16, fontWeight: "800", marginBottom: spacing.sm },
  row: { color: colors.ink, fontFamily, marginBottom: spacing.sm }
});
