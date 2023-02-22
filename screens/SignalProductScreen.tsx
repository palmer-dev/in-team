import React, { useState } from "react";
import {
  TouchableOpacity,
  Button,
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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

type Props = {
  product: Product;
};

export default function SignalProductScreen({
  route,
}: RootTabScreenProps<"SignalProdctScreen">) {
  const { product } = route.params;

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let filename = localUri.split('/').pop();
      let newUri = FileSystem.documentDirectory + filename;
      await FileSystem.moveAsync({
        from: localUri,
        to: newUri,
      });
    }
  };

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      let localUri = result.assets[0].uri;
      let filename = localUri.split('/').pop();
      let newUri = FileSystem.documentDirectory + filename;
      await FileSystem.moveAsync({
        from: localUri,
        to: newUri,
      });
    }
  };
  
  
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
      <View style={{ width: "95%" }}>
        <Text style={styles.label}>Type de problème</Text>
        <DropDownPicker
          style={styles.input}
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
      </View>
      <View style={{ width: "95%" }}>
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

      <View style={{ width: "95%" }}>
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
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles.button} onPress={takeImage}>
          <Text style={styles.buttonText}>Caméra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Fichier</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
    color: "#003D5C",
    fontWeight: "bold",
    fontSize: 15,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
  },
  button: {
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    marginHorizontal: 30,
    backgroundColor: "#003D5C",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#E7E349",
  },
});
