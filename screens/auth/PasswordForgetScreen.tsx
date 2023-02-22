import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import React from "react";

export default function PasswordForgetScreen({
  navigation,
}: RootTabScreenProps<"ForgotPassword">) {
  const [emailAddress, setEmailAdress] = React.useState("");
  const sendAskPassword = (): void => {};
  const cancel = (): void => {
    navigation.navigate("LogIn");
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View>
          <Text style={styles.title} numberOfLines={2}>
            Récupérer mon{"\n"} mot de passe
          </Text>
          {/* USERNAME */}
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            textContentType="emailAddress"
            style={styles.inputField}
            placeholder="Votre nom email"
            placeholderTextColor={"darkgrey"}
            value={emailAddress}
            onChangeText={setEmailAdress}
          ></TextInput>
          <Text style={styles.moreInfos}>
            Vous allez recevoir votre mot de passe par email dans les minutes
            qui suivent
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#003D5C" }]}
            onPress={sendAskPassword}
          >
            <Text style={styles.text}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancel}>
            <Text style={styles.secondAction}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    fontSize: 32,
    textAlign: "center",
    paddingBottom: 80,
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
  moreInfos: {
    paddingTop: 15,
    fontSize: 11,
  },
  secondAction: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "gray",
    paddingTop: 15,
    textAlign: "center",
  },
});
