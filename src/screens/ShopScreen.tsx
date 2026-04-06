import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthPromptCard } from "../components/AuthPromptCard";
import { CartBar } from "../components/CartBar";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { createOrder, listProducts } from "../services/api/commerce";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { Product } from "../types/domain";
import { formatXof } from "../utils/currency";
import { MainTabParamList, RootStackParamList } from "../navigation/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Shop">,
  NativeStackScreenProps<RootStackParamList>
>;

export const ShopScreen = ({ navigation }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  useEffect(() => {
    listProducts().then(setProducts).catch(() => undefined);
  }, []);

  const checkout = async () => {
    if (!token) {
      Alert.alert("Connexion requise", "Connecte-toi pour confirmer la commande.");
      navigation.navigate("Auth", {
        intent: "checkout",
        title: "Connexion requise avant le paiement",
        message: "Tu peux remplir le panier librement. La connexion est demandee uniquement pour finaliser la commande."
      });
      return;
    }

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
      <Text style={styles.kicker}>Boutique</Text>
      <Text style={styles.title}>Produits capillaires, disponibles au panier meme sans connexion.</Text>
      <Text style={styles.subtitle}>Ajoute des articles, puis connecte-toi seulement quand tu veux commander.</Text>
      {products.map((product) => (
        <SectionCard key={product.id} style={styles.productCard}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.meta}>{formatXof(product.price)} · Stock {product.stock}</Text>
          <PrimaryButton label="Ajouter au panier" onPress={() => addItem(product)} tone="secondary" />
        </SectionCard>
      ))}
      {!token && items.length > 0 && (
        <AuthPromptCard
          title="Ton panier est pret."
          description="Connecte-toi seulement au moment de transformer ce panier en commande."
          actionLabel="Se connecter pour commander"
          onPress={() => navigation.navigate("Auth", { intent: "checkout" })}
        />
      )}
      <CartBar onCheckout={checkout} loading={loading} />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 34, fontWeight: "800", lineHeight: 40, marginBottom: spacing.sm },
  subtitle: { color: colors.muted, fontFamily, lineHeight: 22, marginBottom: spacing.lg },
  productCard: { backgroundColor: colors.white },
  name: { color: colors.ink, fontFamily, fontSize: 18, fontWeight: "800", marginBottom: spacing.xs },
  meta: { color: colors.muted, fontFamily, marginBottom: spacing.md }
});
