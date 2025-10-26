import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../../services/soundHandler";
import { useState } from "react";
import { COLORS_DARK, COLORS_LIGHT } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { wordsLearningActions } from "../../store/wordsLearningSlice";

function EditWord({ route, navigation }) {
  const [wordData, setWordData] = useState(() => route.params.wordData);
  const dispatch = useDispatch();

  const isDark = useSelector((state) => state.theme.isDark);
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;

  function onSave() {
    dispatch(
      wordsLearningActions.updateWord({
        word: wordData.word,
        phonetics: wordData.phonetics || "",
        audio: wordData.audio || "",
        meaning: wordData.meaning || "",
        partOfSpeech: wordData.partOfSpeech || "",
      })
    );
    navigation.navigate("AllWords");
  }

  function onRemove() {
    dispatch(wordsLearningActions.removeWord(wordData.word));
    navigation.navigate("AllWords");
  }

  function onChangeWordData(text, propName) {
    setWordData((prevData) => ({ ...prevData, [propName]: text }));
  }

  return (
    <>
      <Image
        style={{
          width: "40%",
          marginTop: 80,
          marginBottom: 20,
          height: undefined,
          aspectRatio: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../../assets/edit-koala.png")}
      />

      <View style={styles.receivedInfoContainer}>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={[styles.word, { color: colors.fontMain }]}>
            {wordData.word}
          </Text>
          {wordData.audio && (
            <Pressable
              style={styles.playPressable}
              onPress={() => playSound(wordData.audio)}
            >
              <Ionicons
                name="volume-medium-outline"
                size={28}
                color={colors.primary900}
              />
            </Pressable>
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: colors.grey600 }]}>
              phonetics:
            </Text>
            <TextInput
              value={wordData.phonetics}
              style={[
                styles.input,
                { borderColor: colors.primary200, color: colors.fontMain },
              ]}
              onChangeText={(text) => onChangeWordData(text, "phonetics")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: colors.grey600 }]}>
              part of speach:
            </Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary200, color: colors.fontMain },
              ]}
              value={wordData.partOfSpeech}
              onChangeText={(text) => onChangeWordData(text, "partOfSpeech")}
            />
          </View>
        </View>
        <Text style={[styles.label, { color: colors.grey600 }]}>meaning:</Text>
        <TextInput
          style={[
            styles.input,
            { borderColor: colors.primary200, color: colors.fontMain },
          ]}
          multiline
          numberOfLines={4}
          onChangeText={(text) => onChangeWordData(text, "meaning")}
          value={wordData.meaning}
          textAlignVertical={"top"}
        />
        {wordData.word && (
          <View style={{flexDirection: 'row', gap: 5, justifyContent: 'space-between'}}>
            <Pressable
              style={[
                styles.buttonContainer,
                { backgroundColor: colors.primary900, width: '40%', marginLeft: 10, height: '40%' },
              ]}
              onPress={onSave}
            >
              <Text style={{ fontSize: 24, color: colors.fontInverse }}>
                Save
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.buttonContainer,
                { backgroundColor: colors.primary900, width: '40%', marginRight: 10, height: '40%' },
              ]}
              onPress={onRemove}
            >
              <Text style={{ fontSize: 24, color: colors.fontInverse }}>
                Remove
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    paddingTop: 10,
  },
  inputContainer: {
    margin: 12,
  },
  receivedInfoContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 32,
  },
  word: {
    fontSize: 32,
    paddingHorizontal: 10,
  },
  phonetics: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  partOfSpeech: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  meaning: {
    fontSize: 16,
    padding: 13,
  },
  buttonContainer: {
    borderRadius: 4,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 14,
  },
  backPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: "2%",
    left: "2%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  playPressable: {
    marginHorizontal: 20,
  },
});

export default EditWord;
