import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import InfoCard from "./InfoCard";

function StatisticsInfo() {
  const words = useSelector((state) => state.wordsLearning.words || []);

  const toLearnCount = words.filter((word) => word?.status === undefined || word.status === 0).length;
  const inProcessCount = words.filter((word) => word?.status === 1).length;
  const learnedCount = words.filter((word) => word?.status === 2).length;

  return (
    <View style={styles.container}>
      <InfoCard
        caption={"To learn"}
        number={toLearnCount}
        color={true ? "hotpink" : "mediumvioletred"}
      />
      <InfoCard
        caption={"In process"}
        number={inProcessCount}
        color={true ? "lightgreen" : "green"}
      />
      <InfoCard
        caption={"Learned"}
        number={learnedCount}
        color={true ? "lightblue" : "mediumblue"}
      />
    </View>
  );
}

export default StatisticsInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "20%",
  },
});
