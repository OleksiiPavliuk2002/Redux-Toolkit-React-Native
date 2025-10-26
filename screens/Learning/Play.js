import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";

import WordCard from "../../components/WordCard";
import { COLORS_DARK, COLORS_LIGHT } from "../../constants";
import { useSelector } from "react-redux";

export default function Play() {
  const wordsToStudy = useSelector(state => state.wordsLearning.words || []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const isDark = useSelector(state => state.theme.isDark);
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;

  const wordsToStudyNow = wordsToStudy.filter(word => word.status !== 2);

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      {wordsToStudyNow.length === 0 ? (
        <View>
          <Text style={[styles.text, { alignSelf: "center", color: colors.fontMain }]}>Congrats!</Text>
          <Text style={[styles.text, {color: colors.fontMain}]}>For now you have learnt all the words</Text>
          <Image
            style={styles.image}
            source={require("../../assets/well-done-icon.png")}
          />
        </View>
      ) : (
        <WordCard
          wordInfo={wordsToStudy[currentWordIndex % wordsToStudy.length]}
          setNext={() =>
            setCurrentWordIndex(
              (currentWordIndex) => (currentWordIndex + 1) % wordsToStudy.length
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 22,
    margin: 10,
    marginTop: 25,
    textAlign: 'center'
  },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
});