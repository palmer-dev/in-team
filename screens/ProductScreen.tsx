import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RootTabScreenProps } from "../types";
import { Product } from "../types";
import SignalCard from "../components/SignalCard";
import { useNavigation } from "@react-navigation/native";

type Props = {
  product: Product;
};

export default function ProductScreen({
  route,
}: RootTabScreenProps<"ProductScreen">) {
  const { product } = route.params;
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMaintenance = () => {
    setIsMaintenanceOpen(!isMaintenanceOpen);
  };

  const signalements = [
    {
      id: 1,
      title: "Maintenance",
      technician: "Joseph Dufour",
      date: "12 juillet 2021",
      time: "12h50",
      etat: "en cours",
    },
    {
      id: 2,
      title: "Réparation",
      technician: "Michel Michel",
      date: "13 juillet 2021",
      time: "8h10",
      etat: "fait",
    },
    {
      id: 3,
      title: "Maintenance",
      technician: "Josiane",
      date: "15 juillet 2021",
      time: "13h50",
      etat: "fait",
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.headerInfo}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>{product.brand}</Text>
            <Text style={styles.subtitle}>Ref: {product.ref}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("SignalProductScreen", { product: product })
              }
            >
              <Text style={styles.buttonText}>Signaler</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor
          tortor quis ligula luctus, quis aliquam nulla accumsan. Donec eget
          enim fringilla, eleifend est id, consequat ex.
        </Text>
        <TouchableOpacity
          style={styles.maintenanceHeader}
          onPress={toggleMaintenance}
        >
          <Text style={styles.maintenanceTitle}>Signalements</Text>
          <Text style={styles.chevron}>{isMaintenanceOpen ? "˄" : "˅"}</Text>
        </TouchableOpacity>
        {isMaintenanceOpen && (
          <View style={styles.maintenanceContent}>
            {signalements.map((signalement) => (
              <SignalCard key={signalement.id} signalement={signalement} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headerInfo: {
    marginLeft: 25,
    flexShrink: 1,
    maxWidth: "60%",
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#777",
  },
  buttonContainer: {
    alignItems: "flex-end",
    width: "100%",
    marginTop: 16,
    paddingRight: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#003D5C",
    padding: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    marginTop: 30,
    color: "#003D5C",
    fontWeight: "bold",
    fontSize: 22,
    position: "relative",
    right: 120,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  maintenanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 5,
    width: "100%",
  },
  maintenanceTitle: {
    color: "#003D5C",
    fontSize: 22,
    fontWeight: "bold",
  },
  chevron: {
    color: "#003D5C",
    fontSize: 30,
    fontWeight: "bold",
  },
  maintenanceContent: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});
