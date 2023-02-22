import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Signalement = {
  title: string;
  machine: string;
  technician: string;
  date: string;
  time: string;
  etat: string;
};

type SignalementCardProps = {
  signalement: Signalement;
};

const SignalementCard = ({ signalement }: SignalementCardProps) => {
  let couleurPastille;
  switch (signalement.etat) {
    case "en cours":
      couleurPastille = "yellow";
      break;
    case "en attente":
      couleurPastille = "red";
      break;
    default:
      couleurPastille = "green";
  }

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("SignalementUniqueScreen", { signalement });
  };
  

  return (
    <TouchableOpacity onPress={onPress}>
    <View style={styles.card}>
      <View style={[styles.pastille, { backgroundColor: couleurPastille }]} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{signalement.title} de la machine {signalement.machine}</Text>
        <Text style={styles.subtitle}>{signalement.technician}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{signalement.date}</Text>
        <Text style={styles.time}>{signalement.time}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 80,
    padding: 16,
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 16,
    marginTop: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  pastille: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    color: "#777",
  },
});

export default SignalementCard;
