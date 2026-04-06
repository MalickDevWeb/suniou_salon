import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, spacing } from "../theme/tokens";
import { PrimaryButton } from "./PrimaryButton";
import { SectionCard } from "./SectionCard";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onPress: () => void;
};

export const AuthPromptCard = ({
  title,
  description,
  actionLabel = "Se connecter",
  onPress
}: Props) => (
  <SectionCard style={styles.card}>
    <Text style={styles.kicker}>Acces securise</Text>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.action}>
      <PrimaryButton label={actionLabel} onPress={onPress} />
    </View>
  </SectionCard>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.ivory,
    borderColor: colors.chrome
  },
  kicker: {
    color: colors.berry,
    fontFamily,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontFamily,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: spacing.xs
  },
  description: {
    color: colors.smoke,
    fontFamily,
    lineHeight: 22
  },
  action: {
    marginTop: spacing.md
  }
});
