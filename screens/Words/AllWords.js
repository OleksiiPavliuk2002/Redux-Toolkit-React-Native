import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native";
import Item from "../../components/ListItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS_DARK, COLORS_LIGHT } from "../../constants";
import { useSelector } from "react-redux";

function AllWords({ navigation }) {
  const words = useSelector(state => state.wordsLearning.words || []);
  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;

  const pressableStyle = {
    ...styles.addPressable,
    backgroundColor: colors.primary900,
  };

  const emptyContainerStyle = {
    ...styles.empty,
    backgroundColor: colors.fontInverse,
  };

  const emptyTextStyle = {
    ...styles.textEmpty,
    color: colors.primary200,
  };

  return (
    <>
      <Pressable
        style={pressableStyle}
        onPress={() => navigation.navigate("AddWord")}
      >
        <Ionicons
          name="add-outline"
          size={46}
          color={colors.appBackground}
        />
      </Pressable>
      <View style={{ flex: 2 }}>
        <FlatList
          data={words}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.word}
          ListEmptyComponent={
            <View style={emptyContainerStyle}>
              <Text style={emptyTextStyle}>No words yet</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/study(option3).png")}
              />
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5,
    zIndex: 10,
  },
  addPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: 200,
    right: "10%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
  },
  image: {
    width: "55%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  empty: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textEmpty: {
    fontSize: 40,
  },
});

export default AllWords;