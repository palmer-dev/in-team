import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import SignalCard from "../components/SignalCard";

export default function SignalScreen({
  navigation,
}: RootTabScreenProps<"SignalScreen">) {
  const signalements = [
    {
      id: 1,
      title: "Maintenance",
      machine: "presse",
      technician: "non attribué",
      date: "Aujourd'hui",
      time: "12h00",
    },
    {
      id: 2,
      title: "Réparation",
      machine: "Alter",
      technician: "Jean Michel",
      date: "10 février 2022",
      time: "14h",
    },
    {
      id: 3,
      title: "Maintenance",
      machine: "presse",
      technician: "non attribué",
      date: "Aujourd'hui",
      time: "12h00",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.container_title}>
        <Text style={styles.title}>Vos signalements</Text>
      </View>
      {signalements.map((signalement) => (
        <SignalCard key={signalement.id} signalement={signalement} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  container_title: {
    backgroundColor: "rgba(229,226,76,0.53)",
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
