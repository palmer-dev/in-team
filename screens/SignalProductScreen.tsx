import React, { useState } from "react";
import {
  TouchableOpacity,
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootTabScreenProps } from "../types";
import { Product } from "../types";
import DropDownPicker from "react-native-dropdown-picker";

type Props = {
  product: Product;
};

export default function SignalScreen({
  route,
}: RootTabScreenProps<"SignalScreen">) {
  const { product } = route.params;

  const [fields, setFields] = useState({
    problemType: "",
    problemLocalisation: "",
    description: "",
  });
  const [problemsType, setProblemsType] = useState<
    { label: String; value: String }[] | undefined
  >([
    { label: "Maintenance", value: "1" },
    { label: "Réparation", value: "2" },
  ]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [problemsTypeSelected, setProblemsTypeSelected] = useState<
    { label: String; value: String } | undefined
  >();

  const handleSubmit = () => {
    const inputRegex = /^[A-Za-z0-9.]{5,1000}$/;
    let isValid = true;

    if (
      !fields.problemType.trim() ||
      !fields.problemLocalisation.trim() ||
      !fields.description.trim() ||
      !problemsTypeSelected ||
      !inputRegex.test(fields.problemLocalisation.trim()) ||
      !inputRegex.test(fields.description.trim())
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.subtitle}>{product.brand}</Text>
          <Text style={styles.subtitle}>Ref: {product.ref}</Text>
        </View>
      </View>

      <DropDownPicker
        style={styles.dropDown}
        modalTitle="Type de message"
        placeholder="Choisissez votre type de message"
        open={openDropDown}
        value={problemsTypeSelected}
        items={problemsType}
        setOpen={setOpenDropDown}
        setValue={setProblemsTypeSelected}
        setItems={setProblemsType}
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

      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Localisation du problème</Text>
        <TextInput
          placeholder="Entrez la localisation"
          style={styles.input}
          value={fields.problemLocalisation}
          onChangeText={(problemLocalisation) =>
            setFields({ ...fields, problemLocalisation: problemLocalisation })
          }
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Entrez la description"
          style={[styles.input, { height: 100 }]}
          value={fields.description}
          onChangeText={(description) =>
            setFields({ ...fields, description: description })
          }
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
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
    marginLeft: 35,
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
  label: {
    marginTop: 25,
    color: "#E20613",
    fontWeight: "bold",
    fontSize: 15,
  },
  dropDown: {
    backgroundColor: "white",
    color: "black",
    marginTop: 5,
    borderColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
  },
});
