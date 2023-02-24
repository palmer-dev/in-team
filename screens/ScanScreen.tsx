import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { getMachineById } from "../hooks/useDatabase";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getMachineById(data).then((machine) => {
      const newProduct = {
        id: machine._id,
        name: machine.nom,
        ref: machine.ref_machine,
        brand: machine.marque,
        image: machine.image,
        image: "https://picsum.photos/200/300",
        category: machine.category.nom,
        description:
          machine.description ??
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor tortor quis ligula luctus, quis aliquam nulla accumsan. Donec eget enim fringilla, eleifend est id, consequat ex.",
      };
      setProduct(newProduct);
      navigation.navigate("ProductScreen", { product: newProduct });
    });
  };

  if (hasPermission === null) {
    return <Text>Demande d'accès à votre caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>Veuillez donné accès à votre caméra</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.consigne}>Scanner le QR Code de votre machine</Text>
      </View>
      <View style={styles.square_topright}></View>
      <View style={styles.square_topright2}></View>
      <View style={styles.square_topleft}></View>
      <View style={styles.square_topleft2}></View>
      <View style={styles.square_bottomleft}></View>
      <View style={styles.square_bottomleft2}></View>
      <View style={styles.square_bottomright}></View>
      <View style={styles.square_bottomright2}></View>
      <View style={{ position: "absolute", ...styles.flexCenter }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={(StyleSheet.absoluteFillObject, styles.camDisplay)}
        />

        {scanned && (
          <TouchableOpacity
            style={styles.buttonlol}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.tryagain}>Réessayer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  flexCenter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    position: "absolute",
    top: "0%",
    zIndex: 50,
    width: "100%",
    height: 40,
    backgroundColor: "white",
  },
  camDisplay: {
    width: 1000,
    height: 1000,
  },
  consigne: {
    color: "#003D5C",
    position: "absolute",
    zIndex: 51,
    fontSize: 20,
    paddingLeft: 20,
    top: "10%",
    marginLeft: 10,
  },
  square_topright: {
    position: "absolute",
    left: "60%",
    top: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  square_topright2: {
    position: "absolute",
    left: "81%",
    top: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  square_topleft: {
    position: "absolute",
    right: "81%",
    top: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  square_topleft2: {
    position: "absolute",
    right: "60%",
    top: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  square_bottomleft: {
    position: "absolute",
    right: "60%",
    bottom: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  square_bottomleft2: {
    position: "absolute",
    right: "81%",
    bottom: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  square_bottomright: {
    position: "absolute",
    left: "81%",
    bottom: "30%",
    zIndex: 10,
    width: 10,
    height: 90,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  square_bottomright2: {
    position: "absolute",
    left: "60%",
    bottom: "30%",
    zIndex: 10,
    width: 90,
    height: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  buttonlol: {
    position: "absolute",
    zIndex: 50,
    left: "21%",
    top: "55%",
  },
  tryagain: {
    color: "white",
    backgroundColor: "#003D5C",
    position: "absolute",
    zIndex: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 50,
  },
});
