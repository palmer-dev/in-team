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
      etat: "en attente",
    },
    {
      id: 2,
      title: "Réparation",
      machine: "Alter",
      technician: "Jean Michel",
      date: "hier",
      time: "9h25",
      etat: "en cours",
    },
    {
      id: 3,
      title: "Maintenance",
      machine: "presse",
      technician: "Josiane",
      date: "14 février",
      time: "12h00",
      etat: "fait",
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
    flex: 1,
    alignItems: "center",
  },
  container_title: {
    backgroundColor: "rgba(229,226,76,0.53)",
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
