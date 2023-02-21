import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Text } from "../../components/Themed";
import { useState } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserEditScreen() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    name_hall: "",
    adress: "",
  });

  const handleSubmit = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneRegex =
      /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    const adressRegex =
      /^(([a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ'.]*\s)\d*(\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']*)*,)*\d*(\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']*)+,\s([\d]{5})\s[a-zA-Z-éÉèÈàÀùÙâÂêÊîÎôÔûÛïÏëËüÜçÇæœ']+/;
    let isValid = true;

    if (
      !fields.firstName.trim() ||
      !fields.lastName.trim() ||
      !fields.email.trim() ||
      !fields.phone.trim() ||
      !fields.name_hall.trim() ||
      !fields.adress.trim()
    ) {
      isValid = false;
    }

    if (
      !nameRegex.test(fields.firstName.trim()) ||
      !nameRegex.test(fields.lastName.trim()) ||
      !emailRegex.test(fields.email.trim()) ||
      !phoneRegex.test(fields.phone.trim()) ||
      !nameRegex.test(fields.name_hall.trim()) ||
      !adressRegex.test(fields.adress.trim())
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
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.inputField}
          value={fields.firstName}
          onChangeText={(firstName) =>
            setFields({ ...fields, firstName: firstName })
          }
        />

        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.inputField}
          value={fields.lastName}
          onChangeText={(lastName) =>
            setFields({ ...fields, lastName: lastName })
          }
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.inputField}
          value={fields.email}
          onChangeText={(email) => setFields({ ...fields, email: email })}
        />

        <Text style={styles.label}>Téléphone portable</Text>
        <TextInput
          style={styles.inputField}
          value={fields.phone}
          onChangeText={(phone) => setFields({ ...fields, phone: phone })}
        />

        <Text style={styles.label}>Nom de la salle</Text>
        <TextInput
          style={styles.inputField}
          value={fields.name_hall}
          onChangeText={(name_hall) =>
            setFields({ ...fields, name_hall: name_hall })
          }
        />

        <Text style={styles.label}>Nom de la salle</Text>
        <TextInput
          style={styles.inputField}
          value={fields.name_hall}
          onChangeText={(name_hall) =>
            setFields({ ...fields, name_hall: name_hall })
          }
        />

        <Text style={styles.label}>Adresse</Text>
        <TextInput
          style={styles.inputField}
          value={fields.adress}
          onChangeText={(adress) => setFields({ ...fields, adress: adress })}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
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
    color: "#E20613",
    fontWeight: "bold",
    fontSize: 15,
  },
  inputField: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  dropDown: {
    backgroundColor: "white",
    color: "black",
    marginTop: 5,
    marginBottom: 30,
    borderColor: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    marginHorizontal: 30,
    backgroundColor: "#f74820",
  },
  buttonText: {
    fontWeight: "bold",
  },
});
