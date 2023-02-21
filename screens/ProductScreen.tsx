import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RootTabScreenProps } from "../types";
import { Product } from "../types";

type Props = {
  product: Product;
};

export default function ProductScreen({
  route,
  navigation,
}: RootTabScreenProps<"ProductScreen">) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.subtitle}>{product.brand}</Text>
          <Text style={styles.subtitle}>{product.ref}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Signaler</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor
        tortor quis ligula luctus, quis aliquam nulla accumsan. Donec eget enim
        fringilla, eleifend est id, consequat ex. Sed sed risus euismod,
        tincidunt metus in, pharetra nibh. Proin id sollicitudin enim. Nunc sit
        amet varius massa. Aliquam sed hendrerit enim, in bibendum arcu. Sed
        euismod euismod turpis at varius. Donec vel pharetra sapien. Donec
        tristique, lectus quis sagittis rhoncus, ex dolor pretium tellus, id
        elementum velit lacus id nibh. Nulla facilisi. Donec placerat felis
        turpis, ut posuere tellus tincidunt sit amet.
      </Text>
    </View>
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
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#777",
    marginTop: 4,
  },
  button: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
    marginLeft: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
  },
});
