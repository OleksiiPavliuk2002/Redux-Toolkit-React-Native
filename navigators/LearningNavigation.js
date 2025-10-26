import { createDrawerNavigator } from "@react-navigation/drawer";

import Statistics from "../screens/Learning/Statistics";
import Play from "../screens/Learning/Play";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

function LearningNavigation() {
    const isDark = useSelector(state => state.theme.isDark);
    const colors = isDark ? COLORS_DARK : COLORS_LIGHT;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: "800" },
        headerTintColor: colors.primary900,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.appBackground,
        },
        drawerStyle: {
          backgroundColor: colors.primary200,
          width: 140,
          height: 130,
          borderBottomRightRadius: 20,
        },
        drawerInactiveTintColor: colors.fontMain,
        drawerActiveTintColor: colors.primary100,
        drawerActiveBackgroundColor: colors.primary300,
        contentStyle: { backgroundColor: colors.appBackground },
      }}
    >
      <Drawer.Screen name="Statistics" component={Statistics} />
      <Drawer.Screen name="Play" component={Play} />
    </Drawer.Navigator>
  );
}

export default LearningNavigation;
