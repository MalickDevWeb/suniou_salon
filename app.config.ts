import 'dotenv/config'
import type { ExpoConfig } from 'expo/config'

const projectId = process.env.EXPO_PROJECT_ID

const config: ExpoConfig = {
  name: 'Suniou Salon',
  slug: 'suniou-salon-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  scheme: 'suniou',
  runtimeVersion: {
    policy: 'appVersion',
  },
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#f6efe6',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.malickdevweb.suniou',
  },
  android: {
    package: 'com.malickdevweb.suniou',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#f6efe6',
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:3001/api',
    ...(projectId ? { eas: { projectId } } : {}),
  },
}

export default config
