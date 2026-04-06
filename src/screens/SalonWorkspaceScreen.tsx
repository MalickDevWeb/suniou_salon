import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";

import { AppField } from "../components/AppField";
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
import { colors, fontFamily, spacing } from "../theme/tokens";
import { Booking, SalonRecord } from "../types/domain";

export const SalonWorkspaceScreen = () => {
  const [mySalon, setMySalon] = useState<SalonRecord | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [salonName, setSalonName] = useState("Mon salon");
  const [address, setAddress] = useState("Plateau, Dakar");
  const [latitude, setLatitude] = useState("14.6709");
  const [longitude, setLongitude] = useState("-17.4339");
  const [serviceName, setServiceName] = useState("Tresses Signature");
  const [productName, setProductName] = useState("Huile capillaire");

  useEffect(() => {
    getMySalon().then(setMySalon).catch(() => undefined);
    listOwnerBookings().then(setBookings).catch(() => undefined);
  }, []);

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
  title: { color: colors.ink, fontFamily, fontSize: 28, fontWeight: "800", marginBottom: spacing.lg },
  line: { color: colors.ink, fontFamily, marginBottom: spacing.xs }
});
