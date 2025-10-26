import { View, StyleSheet, Text, StatusBar, Pressable } from "react-native";
import StatisticsInfo from "../../components/StatisticsInfo";
import ImagePile from "../../components/ImagePile";
import { COLORS_DARK, COLORS_LIGHT } from "../../constants";
import { useSelector } from "react-redux";

export default function Statistics() {
  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;

  return (
    <View style={[styles.container, { backgroundColor: colors.appBackground }]}>
      <StatisticsInfo />
      <ImagePile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
