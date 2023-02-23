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
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootTabScreenProps } from "../types";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";

export default function SignalProductScreen({
  route,
}: RootTabScreenProps<"SignalProdctScreen">) {
  const { product } = route.params;

  const [images, setImages] = useState([]);

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      setImages([...images, newImage]);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      setImages([...images, newImage]);
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  return (
    <ScrollView>
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
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.button} onPress={takeImage}>
            <Text style={styles.buttonText}>Caméra</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Fichier</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imagesContainer}>
          {images.slice(0, 3).map((uri) => (
            <TouchableWithoutFeedback onPress={() => handleImageClick(uri)}>
              <Image source={{ uri }} key={uri} style={styles.image_prise} />
            </TouchableWithoutFeedback>
          ))}
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          >
            <Image style={styles.modalImage} source={{ uri: selectedImage }} />
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    justifyContent: "space-between",
    width: "100%",
  },
  headerInfo: {
    marginLeft: 25,
    flexShrink: 1,
    maxWidth: "60%",
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
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  image_prise: {
    margin: 5,
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 5,
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
  },
});
