import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoadingView } from "../components/LoadingView";
import { useSessionBootstrap } from "../hooks/useSessionBootstrap";
import { AuthScreen } from "../screens/AuthScreen";
import { BookingScreen } from "../screens/BookingScreen";
import { SalonDetailsScreen } from "../screens/SalonDetailsScreen";
import { SalonWorkspaceScreen } from "../screens/SalonWorkspaceScreen";
import { useAuthStore } from "../store/authStore";
import { MainTabs } from "./MainTabs";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const ready = useSessionBootstrap();
  const token = useAuthStore((state) => state.token);

  if (!ready) return <LoadingView label="Initialisation de la session..." />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="SalonDetails" component={SalonDetailsScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="SalonWorkspace" component={SalonWorkspaceScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
