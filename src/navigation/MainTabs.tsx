import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors, fontFamily } from "../theme/tokens";
import { MainTabParamList } from "./types";
import { HomeScreen } from "../screens/HomeScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ShopScreen } from "../screens/ShopScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.pine,
      tabBarInactiveTintColor: colors.muted,
      tabBarIcon: () => null,
      tabBarIconStyle: { display: "none" },
      tabBarStyle: {
        backgroundColor: colors.paper,
        borderTopColor: colors.line,
        height: 64,
        paddingBottom: 8,
        paddingTop: 8
      },
      tabBarItemStyle: { paddingVertical: 2 },
      tabBarLabelStyle: {
        fontFamily,
        fontSize: 12,
        fontWeight: "700"
      }
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Accueil" }} />
    <Tab.Screen name="Shop" component={ShopScreen} options={{ tabBarLabel: "Boutique" }} />
    <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: "Commandes" }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "Profil" }} />
  </Tab.Navigator>
);
