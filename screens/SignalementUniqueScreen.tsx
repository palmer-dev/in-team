import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { RouteProp } from "@react-navigation/native";

type Signalement = {
  title: string;
  machine: string;
  technician: string;
  date: string;
  time: string;
  etat: string;
};

type SignalementParamList = {
  SignalementUniqueScreen: { signalement: Signalement };
};

type SignalementUniqueScreenRouteProp = RouteProp<
  SignalementParamList,
  "SignalementUniqueScreen"
>;

type SignalementUniqueScreenProps = {
  route: SignalementUniqueScreenRouteProp;
};

const SignalementUniqueScreen = ({ route }: SignalementUniqueScreenProps) => {
  const { signalement } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container_title}>
          <Text style={styles.title}>
            {signalement.title} de la machine {signalement.machine}
          </Text>
        </View>
        <Text style={styles.subtitle}>
          Signalement: {signalement.date} - Heure: {signalement.time}
        </Text>
        <Text style={styles.subtitle}>
          Technicien: {signalement.technician}
        </Text>
        <Text style={signalement.etat === "fait" ? styles.subtitle : styles.etat}>État: {signalement.etat}</Text>
        {signalement.etat === "fait" && (
          <View style={styles.reparations}>
            <Text style={styles.label}>Réparations effectuées</Text>
            <Text>- Réparation 1</Text>
            <Text>- Réparation 2</Text>
            <Text>- Réparation 3</Text>
            <Text style={styles.label}>Informations complémentaires</Text>
            <Text style={{fontSize: 16}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text style={styles.label}>Pièces jointes</Text>
            <View style={styles.images}>
              <TouchableWithoutFeedback
                onPress={() =>
                  handleImageClick("https://picsum.photos/200/300")
                }
              >
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: "https://picsum.photos/200/300" }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() =>
                  handleImageClick("https://picsum.photos/200/301")
                }
              >
                <View>
                  <Image
                    style={styles.image}
                    source={{ uri: "https://picsum.photos/200/301" }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Modal visible={modalVisible} transparent={true}>
              <TouchableOpacity
                style={styles.modalBackground}
                onPress={() => setModalVisible(false)}
              >
                <Image
                  style={styles.modalImage}
                  source={{ uri: selectedImage }}
                />
              </TouchableOpacity>
            </Modal>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  container_title: {
    backgroundColor: "rgba(229,226,76,0.53)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 18,
    color: "#777",
    marginBottom: 8,
  },
  label: {
    marginTop: 30,
    color: "#003D5C",
    fontWeight: "bold",
    fontSize: 22,
  },
  etat: {
    marginTop: 160,
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  reparations: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  images: {
    marginTop: 16,
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 150,
    marginHorizontal: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
  },
});
export default SignalementUniqueScreen;
