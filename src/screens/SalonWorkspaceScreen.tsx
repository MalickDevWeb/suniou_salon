import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppField } from "../components/AppField";
import { AuthPromptCard } from "../components/AuthPromptCard";
import { PrimaryButton } from "../components/PrimaryButton";
import { ScreenShell } from "../components/ScreenShell";
import { SectionCard } from "../components/SectionCard";
import { createProductItem } from "../services/api/commerce";
import {
  createSalonProfile,
  createServiceItem,
  getMySalon,
  listOwnerBookings
} from "../services/api/salons";
import { useAuthStore } from "../store/authStore";
import { colors, fontFamily, spacing } from "../theme/tokens";
import { Booking, SalonRecord } from "../types/domain";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "SalonWorkspace">;

export const SalonWorkspaceScreen = ({ navigation }: Props) => {
  const user = useAuthStore((state) => state.user);
  const [mySalon, setMySalon] = useState<SalonRecord | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [salonName, setSalonName] = useState("Mon salon");
  const [address, setAddress] = useState("Plateau, Dakar");
  const [latitude, setLatitude] = useState("14.6709");
  const [longitude, setLongitude] = useState("-17.4339");
  const [serviceName, setServiceName] = useState("Tresses Signature");
  const [productName, setProductName] = useState("Huile capillaire");

  useEffect(() => {
    if (!user || user.role !== "SALON") return;
    getMySalon().then(setMySalon).catch(() => undefined);
    listOwnerBookings().then(setBookings).catch(() => undefined);
  }, [user]);

  if (!user) {
    return (
      <ScreenShell>
        <Text style={styles.kicker}>Espace salon</Text>
        <Text style={styles.title}>Connecte-toi avec un compte salon pour gerer ton activite.</Text>
        <AuthPromptCard
          title="Acceder au back-office salon"
          description="Creer des services, publier des produits et suivre les reservations recues."
          actionLabel="Se connecter"
          onPress={() => navigation.navigate("Auth", { intent: "workspace" })}
        />
      </ScreenShell>
    );
  }

  if (user.role !== "SALON") {
    return (
      <ScreenShell>
        <Text style={styles.kicker}>Espace salon</Text>
        <Text style={styles.title}>Cet espace est reserve aux comptes salon.</Text>
        <SectionCard>
          <Text style={styles.line}>Connecte-toi avec un compte SALON pour gerer un etablissement.</Text>
        </SectionCard>
      </ScreenShell>
    );
  }

  const handleCreateSalon = async () => {
    const salon = await createSalonProfile({ name: salonName, address, latitude: Number(latitude), longitude: Number(longitude) });
    setMySalon(salon);
    Alert.alert("Salon cree", "Ton profil salon est pret.");
  };

  const handleCreateService = async () => {
    if (!mySalon) return;
    await createServiceItem({ salonId: mySalon.id, name: serviceName, price: 15000, durationMinutes: 90 });
    Alert.alert("Service ajoute", "Le service est disponible.");
  };

  const handleCreateProduct = async () => {
    if (!mySalon) return;
    await createProductItem({ salonId: mySalon.id, name: productName, price: 9000, stock: 12 });
    Alert.alert("Produit ajoute", "Le produit est visible dans la boutique.");
  };

  return (
    <ScreenShell>
      <Text style={styles.kicker}>Espace salon</Text>
      <Text style={styles.title}>Espace salon</Text>
      <SectionCard>
        <Text style={styles.line}>Profil: {mySalon?.name ?? "A creer"}</Text>
        <Text style={styles.line}>Reservations: {bookings.length}</Text>
      </SectionCard>
      {!mySalon && (
        <SectionCard>
          <AppField label="Nom du salon" value={salonName} onChangeText={setSalonName} />
          <AppField label="Adresse" value={address} onChangeText={setAddress} />
          <AppField label="Latitude" value={latitude} onChangeText={setLatitude} />
          <AppField label="Longitude" value={longitude} onChangeText={setLongitude} />
          <PrimaryButton label="Creer mon salon" onPress={handleCreateSalon} />
        </SectionCard>
      )}
      {!!mySalon && (
        <>
          <SectionCard>
            <AppField label="Nouveau service" value={serviceName} onChangeText={setServiceName} />
            <PrimaryButton label="Ajouter le service" onPress={handleCreateService} tone="secondary" />
          </SectionCard>
          <SectionCard>
            <AppField label="Nouveau produit" value={productName} onChangeText={setProductName} />
            <PrimaryButton label="Ajouter le produit" onPress={handleCreateProduct} tone="secondary" />
          </SectionCard>
        </>
      )}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  kicker: { color: colors.ember, fontFamily, fontWeight: "700", marginBottom: spacing.sm },
  title: { color: colors.ink, fontFamily, fontSize: 34, fontWeight: "800", lineHeight: 40, marginBottom: spacing.lg },
  line: { color: colors.ink, fontFamily, marginBottom: spacing.xs }
});
