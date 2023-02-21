import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Maintenance = {
  title: string;
  technician: string;
  date: string;
  time: string;
};

type MaintenanceCardProps = {
  maintenance: Maintenance;
};

const MaintenanceCard = ({ maintenance }: MaintenanceCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{maintenance.title}</Text>
        <Text style={styles.subtitle}>{maintenance.technician}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{maintenance.date}</Text>
        <Text style={styles.time}>{maintenance.time}</Text>
      </View>
    </View>
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

export default MaintenanceCard;
