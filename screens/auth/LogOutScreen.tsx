import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableHighlight,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { logout } from "../../hooks/useDatabase";
import { RootTabScreenProps } from "../../types";

export default function LogOutScreen({
  navigation,
}: RootTabScreenProps<"Compte">) {
  const goToLogin = (): void => {
    navigation.navigate("LogIn", {
      hasLoggedOut: true,
    });
  };

  // *********************************************
  // Function me permettant de faire une rotation au bras du personnage
  let rotateValueHolder = new Animated.Value(0);
  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const spin = rotateValueHolder.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["15deg", "60deg", "15deg"],
  });

  useEffect(() => {
    startImageRotateFunction();
  }, []);
  // *********************************************

  return (
    <View style={styles.container}>
      {/* Container avec le bouton et le text */}
      <View style={styles.container_text}>
        <Text style={styles.title}>&#192; bientôt !</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Vous êtes déconnecté !</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#0086CC" }]}
          onPress={goToLogin}
        >
          <Text style={styles.text}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 2,
    width: "80%",
    backgroundColor: "black",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 60,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  character: {
    width: 140,
    height: 220,
    position: "relative",
    top: -40,
    left: -12,
  },
  arm: {
    position: "absolute",
    width: 140,
    height: 220,
    top: 28,
    left: -19,
  },
  container_image: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
    marginBottom: -50,
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
