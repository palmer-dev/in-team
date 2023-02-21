import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

type Product = {
  name: string;
  ref: string;
  brand: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = (props: ProductCardProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("ProductScreen", { product: props.product });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: props.product.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.product.name}</Text>
          <Text style={styles.subtitle}>{props.product.brand}</Text>
          <Text style={styles.subtitle}>{props.product.ref}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
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
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 16,
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
});

export default ProductCard;
