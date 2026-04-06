import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { CartBar } from "../components/CartBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { createOrder, listProducts } from "../services/api/commerce";
import { useCartStore } from "../store/cartStore";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { Product } from "../types/domain";
import { formatXof } from "../utils/currency";
import { MainTabParamList } from "../navigation/types";

type Props = BottomTabScreenProps<MainTabParamList, "Shop">;

export const ShopScreen = (_props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  useEffect(() => {
    listProducts().then(setProducts).catch(() => undefined);
  }, []);

  const checkout = async () => {
    try {
      setLoading(true);
      await createOrder(items.map((item) => ({ productId: item.productId, quantity: item.quantity })));
      clear();
      Alert.alert("Commande validee", "Ta commande a ete envoyee au salon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell>
      <Text style={styles.title}>Boutique</Text>
      {products.map((product) => (
        <SectionCard key={product.id}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.meta}>{formatXof(product.price)} · Stock {product.stock}</Text>
          <PrimaryButton label="Ajouter au panier" onPress={() => addItem(product)} tone="secondary" />
        </SectionCard>
      ))}
      <CartBar onCheckout={checkout} loading={loading} />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  title: { color: colors.ink, fontFamily, fontSize: 28, fontWeight: "800", marginBottom: spacing.lg },
  name: { color: colors.ink, fontFamily, fontSize: 18, fontWeight: "800", marginBottom: spacing.xs },
  meta: { color: colors.muted, fontFamily, marginBottom: spacing.md }
});
