import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthPromptCard } from "../components/AuthPromptCard";
import { LoadingView } from "../components/LoadingView";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { listOrders } from "../services/api/commerce";
import { useAuthStore } from "../store/authStore";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { Order } from "../types/domain";
import { formatXof } from "../utils/currency";
import { MainTabParamList, RootStackParamList } from "../navigation/types";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "Orders">,
  NativeStackScreenProps<RootStackParamList>
>;

export const OrdersScreen = ({ navigation }: Props) => {
  const isFocused = useIsFocused();
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isFocused || !token) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    listOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [isFocused, token]);

  if (loading) return <LoadingView label="Chargement des commandes..." />;

  if (!token) {
    return (
      <ScreenShell>
        <Text style={styles.kicker}>Commandes</Text>
        <Text style={styles.title}>Ton historique sera visible ici des que tu te connectes.</Text>
        <Text style={styles.subtitle}>Pas besoin de compte pour explorer la boutique. La connexion sert seulement a retrouver tes achats.</Text>
        <AuthPromptCard
          title="Ouvrir mon espace commande"
          description="Connecte-toi pour suivre les commandes deja passees, leurs statuts et leurs montants."
          actionLabel="Se connecter"
          onPress={() => navigation.navigate("Auth", { intent: "orders" })}
        />
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Commandes</Text>
      <Text style={styles.title}>Mes commandes</Text>
      {orders.length === 0 && (
        <SectionCard>
          <Text style={styles.empty}>Aucune commande pour le moment.</Text>
        </SectionCard>
      )}
      {orders.map((order) => (
        <SectionCard key={order.id}>
          <Text style={styles.head}>Commande {order.id.slice(0, 8)}</Text>
          <Text style={styles.line}>{order.status} · {formatXof(order.totalAmount)}</Text>
          <Text style={styles.line}>{order.items.length} ligne(s)</Text>
        </SectionCard>
      ))}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 34, fontWeight: "800", lineHeight: 40, marginBottom: spacing.sm },
  subtitle: { color: colors.muted, fontFamily, lineHeight: 22, marginBottom: spacing.lg },
  head: { color: colors.pine, fontFamily, fontWeight: "800", marginBottom: spacing.xs },
  line: { color: colors.ink, fontFamily, marginBottom: spacing.xs },
  empty: { color: colors.muted, fontFamily }
});
