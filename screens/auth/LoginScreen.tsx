import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import React, { useState } from "react";
import { auth } from "../../hooks/useDatabase";
import { useFocusEffect } from "@react-navigation/native";
import useColorScheme from "../../hooks/useColorScheme";

export default function LoginScreen({
  route,
  navigation,
}: RootTabScreenProps<"LogIn">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const colorSchema = useColorScheme();

  colorSchema == "dark" ? "couleurDark" : "couleurLight";

  const hasLoggedOut = route.params ? route.params?.hasLoggedOut : false;

  useFocusEffect(
    React.useCallback(() => {
      if (hasLoggedOut) {
        setUsername("");
        setPassword("");
      }
    }, [])
  );

  const sendForm = async () => {
    let isLogedIn = await auth(username.replace(/^\s+|\s+$/g, ""), password);

    if (isLogedIn == true) {
      navigation.navigate("Root");
    } else {
      Alert.alert(
        "Informations incorrectes",
        "Le nom d'utilisateur et le mot de passe saisis ne correspondent à aucun compte existant, veuillez vérifier les informations de connexion.",
        [
          {
            text: "Annuler",
            onPress: () => {},
            style: "destructive",
          },
        ]
      );
    }
  };

  const forgotPasssword = (): void => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container]}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/splash.png")}
          />
        </View>
        <View>
          <Text style={styles.title}>Compte</Text>
        </View>
        {/* USERNAME */}
        <View>
          <Text style={styles.labelText}>Identifiant</Text>
          <TextInput
            textContentType="username"
            style={styles.inputField}
            placeholder="Votre nom d'utilisateur"
            placeholderTextColor={"darkgrey"}
            value={username}
            onChangeText={setUsername}
          ></TextInput>
        </View>

        {/* PASSWORD */}
        <View>
          <Text style={styles.labelText}>Mot de passe</Text>
          <TextInput
            textContentType="password"
            secureTextEntry={true}
            style={styles.inputField}
            placeholderTextColor={"darkgrey"}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
          ></TextInput>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#003D5C" }]}
          onPress={sendForm}
        >
          <Text style={styles.text}>Connexion</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={forgotPasssword}>
          <Text style={styles.secondAction}>Mot de passe oulié ?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    paddingBottom: 10,
    paddingTop: 30,
  },
  inputField: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 14,
    paddingTop: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 50,
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
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  secondAction: {
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "gray",
    paddingTop: 15,
  },
});
