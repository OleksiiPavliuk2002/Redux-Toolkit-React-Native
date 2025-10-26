import { View, StyleSheet, Switch, Text } from "react-native";
import { COLORS_DARK, COLORS_LIGHT } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/themeSlice";

function Settings() {
  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;
  const dispatch = useDispatch();

  const containerStyle = {
    ...styles.container,
    backgroundColor: colors.appBackground,
  };

  const textStyle = {
    ...styles.caption,
    color: colors.fontMain,
  };

  return (
    <View style={containerStyle} testID="settings-container">
      <Text style={textStyle}>Choose color theme:</Text>
      <View style={styles.switchContainer}>
        <Text style={textStyle}>Light</Text>
        <Switch
        value={isDark}
        onValueChange={() => dispatch(themeActions.toggle())}
          trackColor={{
            false: COLORS_LIGHT.grey300,
            true: COLORS_DARK.primary300,
          }}
          thumbColor={colors.primary900}
          ios_backgroundColor={colors.primary200}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
        <Text style={textStyle}>Dark</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 100,
  },
  caption: {
    fontSize: 18,
    margin: 30,
  },
});

export default Settings;
