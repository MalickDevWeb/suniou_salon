# Suniou Salon Mobile

Application mobile Expo pour reservation et e-commerce salon de coiffure.

## Stack

- Expo SDK 54
- React Native
- React Navigation
- Zustand
- Axios
- Expo Location

## Demarrage

```bash
npm install
cp .env.example .env
npm run start
```

## Variable d'environnement

```env
EXPO_PUBLIC_API_URL=http://127.0.0.1:3001/api
EXPO_PROJECT_ID=
```

Pour le developpement local:

- web ou iOS simulateur: `http://127.0.0.1:3001/api`
- Android Emulator: `http://10.0.2.2:3001/api`
- telephone physique: remplace par l'IP LAN de ta machine, par exemple `http://192.168.1.20:3001/api`

Smoke test reseau local:

```bash
EXPO_PUBLIC_API_URL=http://127.0.0.1:3001/api npm run smoke:local
```

## Ecrans inclus

- Authentification client ou salon
- Accueil avec salons proches
- Detail salon et choix de service
- Reservation
- Boutique et panier
- Historique des commandes
- Profil
- Outils salon pour creer profil, service et produit

## Deploiement Expo

Source officielle Expo consultee:

- create-expo-app / EAS Build: https://docs.expo.dev/build/introduction/
- EAS Workflows: https://docs.expo.dev/eas/workflows/get-started/
- EAS Update channels: https://docs.expo.dev/eas-update/deployment/

Preparation:

```bash
npm install
npx eas-cli@latest init
```

Puis:

```bash
npx eas-cli@latest build --platform android --profile preview
npx eas-cli@latest build --platform android --profile production
```

Pour les mises a jour OTA apres build:

```bash
npx eas-cli@latest update --branch production --message "release mobile"
```
