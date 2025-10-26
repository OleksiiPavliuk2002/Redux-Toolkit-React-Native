import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import WordsNavigation from "./WordsNavigation";
import LearningNavigation from "./LearningNavigation";
import Settings from "../screens/Settings";
import { StatusBar } from "react-native";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

function MainNavigator() {
  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;

  return (
    <>
      <StatusBar
        backgroundColor={colors.appBackground}
        barStyle={true ? "light-content" : "dark-content"}
      />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitleStyle: { fontWeight: "800" },
            tabBarActiveTintColor: colors.primary900,
            tabBarActiveBackgroundColor: colors.appBackground,
            tabBarInactiveBackgroundColor: colors.appBackground,
            headerStyle: {
              backgroundColor: colors.appBackground,
            },
            headerTintColor: colors.primary900,
            headerTitleAlign: "center",
          }}
        >
          <Tab.Screen
            name="Words"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list-outline" size={size} color={color} />
              ),
            }}
            component={WordsNavigation}
          />
          <Tab.Screen
            name="Learning"
            component={LearningNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="book-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainNavigator;
