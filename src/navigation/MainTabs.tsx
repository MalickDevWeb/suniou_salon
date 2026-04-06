import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors } from "../theme/tokens";
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
      tabBarStyle: { backgroundColor: colors.paper, borderTopColor: colors.line }
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Shop" component={ShopScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);
