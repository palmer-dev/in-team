import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../../components/Themed";
import React from "react";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function HelpScreen() {
  const [fields, setFields] = useState({
    subject: "",
    messageType: "",
    message: "",
  });
  const [messagesType, setMessagesType] = useState<
    { label: String; value: String }[] | undefined
  >([
    { label: "Bug page home", value: "1" },
    { label: "Bug page formulaires", value: "2" },
    { label: "Bug page profile", value: "3" },
    { label: "Demande d'aide", value: "4" },
    { label: "Demande d'informations", value: "5" },
    { label: "Demande de modifications", value: "6" },
    { label: "Demande d'ajout", value: "7" },
  ]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [messagesTypeSelected, setMessagesTypeSelected] = useState<
    { label: String; value: String } | undefined
  >();

  const handleSubmit = () => {
    const inputRegex = /^[A-Za-z0-9.]{5,1000}$/;
    let isValid = true;

    if (
      !fields.subject.trim() ||
      !fields.messageType.trim() ||
      !messagesTypeSelected ||
      !inputRegex.test(fields.subject.trim()) ||
      !inputRegex.test(fields.messageType.trim())
    ) {
      isValid = false;
    }

    if (isValid) {
      Alert.alert(
        "Formulaire complet",
        "Tous les champs du formulaire sont complet"
      );
    } else {
      Alert.alert(
        "Formulaire incomplet",
        "Un ou plusieurs champs du formulaire n'ont pas été saisi correctement. Veuillez compléter le formulaire.",
        [
          {
            text: "ok",
            onPress: () => {},
            style: "destructive",
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={{ backgroundColor: "transparent" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Un problème ?
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Une demande ?
          </Text>
          <Text style={{ fontSize: 18 }}>Nous sommes à l'écoute !</Text>
        </View>
        <Text style={styles.label}>Sujet</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Sujet"
          value={fields.subject}
          onChangeText={(subject) => setFields({ ...fields, subject: subject })}
        />

        <Text style={styles.label}>Type de message</Text>
        <DropDownPicker
          style={styles.dropDown}
          modalTitle="Type de message"
          placeholder="Choisis ton type de message"
          open={openDropDown}
          value={messagesTypeSelected}
          items={messagesType}
          setOpen={setOpenDropDown}
          setValue={setMessagesTypeSelected}
          setItems={setMessagesType}
          theme="LIGHT"
          mode="BADGE"
          scrollViewProps={{
            decelerationRate: "fast",
          }}
          modalProps={{
            animationType: "slide",
          }}
          listMode="FLATLIST"
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Votre message"
          multiline={true}
          numberOfLines={10}
          value={fields.message}
          onChangeText={(message) => setFields({ ...fields, message: message })}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  label: {
    marginTop: 25,
    color: "#003D5C",
    fontWeight: "bold",
    fontSize: 15,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    textAlignVertical: "top",
    paddingTop: 16,
  },
  dropDown: {
    backgroundColor: "white",
    color: "black",
    marginTop: 5,
    borderColor: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    marginHorizontal: 40,
    backgroundColor: "#003D5C",
    marginTop: 30,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
