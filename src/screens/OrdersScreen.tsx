import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { LoadingView } from "../components/LoadingView";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { listOrders } from "../services/api/commerce";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { Order } from "../types/domain";
import { formatXof } from "../utils/currency";

export const OrdersScreen = () => {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) return;
    listOrders().then(setOrders).finally(() => setLoading(false));
  }, [isFocused]);

  if (loading) return <LoadingView label="Chargement des commandes..." />;

  return (
    <ScreenShell>
      <Text style={styles.title}>Mes commandes</Text>
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
  title: { color: colors.ink, fontFamily, fontSize: 28, fontWeight: "800", marginBottom: spacing.lg },
  head: { color: colors.pine, fontFamily, fontWeight: "800", marginBottom: spacing.xs },
  line: { color: colors.ink, fontFamily, marginBottom: spacing.xs }
});
