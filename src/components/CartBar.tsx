import { StyleSheet, Text, View } from "react-native";

import { useCartStore } from "../store/cartStore";
import { formatXof } from "../utils/currency";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { PrimaryButton } from "./PrimaryButton";

export const CartBar = ({
  onCheckout,
  loading
}: {
  onCheckout: () => void;
  loading?: boolean;
}) => {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (items.length === 0) return null;
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{items.length} articles · {formatXof(total)}</Text>
      <PrimaryButton label="Commander" onPress={onCheckout} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm, marginTop: spacing.md },
  text: { color: colors.ink, fontFamily, fontWeight: "700" }
});
