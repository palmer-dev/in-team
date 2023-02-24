import React, { useState } from "react";
import {
	TouchableOpacity,
	Button,
	Alert,
	Image,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, View, TextInput } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootTabScreenProps } from "../types";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import { setNewSignalement, uploadImage } from "../hooks/useDatabase";
const { v4: uuidv4 } = require("uuid");

export default function SignalProductScreen({
	route,
	navigation,
}: RootTabScreenProps<"SignalProdctScreen">) {
	const { product } = route.params;

	const [images, setImages] = useState([]);

	const takeImage = async () => {
		if (images.length >= 3) {
			Alert.alert(
				"Trop d'images",
				"Vous ne pouvez choisir que 3 images pour illustrer la situation."
			);
			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			quality: 0.5,
		});

		if (!result.canceled) {
			const newImage = {
				uri: result.assets[0].uri,
				type: result.assets[0].type,
				name: result.assets[0].uri.substring(
					result.assets[0].uri.lastIndexOf("/") + 1,
					result.assets[0].uri.length
				),
			};
			if (images.length < 3) {
				setImages([...images, newImage]);
			}
		}
	};

	const pickImage = async () => {
		if (images.length >= 3) {
			Alert.alert(
				"Trop d'images",
				"Vous ne pouvez choisir que 3 images pour illustrer la situation."
			);
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 0.5,
		});

		if (!result.canceled) {
			const newImage = {
				uri: result.assets[0].uri,
				type: result.assets[0].type,
				name: result.assets[0].uri.substring(
					result.assets[0].uri.lastIndexOf("/") + 1,
					result.assets[0].uri.length
				),
			};
			if (images.length < 3) {
				setImages([...images, newImage]);
			}
		}
	};

	const [fields, setFields] = useState({
		problemLocalisation: "",
		description: "",
		problemTitle: "",
	});

	const [problemsType, setProblemsType] = useState([
		{ label: "Maintenance", value: "1" },
		{ label: "Réparation", value: "2" },
	]);
	const [openDropDown, setOpenDropDown] = useState(false);
	const [problemsTypeSelected, setProblemsTypeSelected] = useState<
		{ label: String; value: String } | undefined
	>();

	const handleSubmit = () => {
		let isValid = true;

		if (
			!fields.problemLocalisation ||
			!problemsTypeSelected ||
			fields.problemLocalisation.length > 1000 ||
			fields.description.length > 1000
		) {
			isValid = false;
		}

		if (isValid) {
			// Upload des images
			if (images.length > 0) {
				setModalLoadingVisible(true);
				images.forEach((image) => {
					const data = new FormData();
					data.append("name", "avatar");
					data.append("fileData", image);
					uploadImage(data).then((response) => {
						setModalLoadingVisible(false);
					});
				});
			}
			// Upload des données
			const newRapport = {
				machine: product.id,
				probleme: fields.problemTitle,
				localisation_probleme: fields.problemLocalisation,
				description_probleme: fields.description,
				type: problemsTypeSelected,
				photo_probleme: images.map((image) => image.name),
			};
			setNewSignalement(newRapport).then((stat) => {
				Alert.alert(
					"Signalement enregistré !",
					"Le signalement a bien été enregistré dans nos données. Elle sera traité le plus rapidement possible!"
				);
				navigation.goBack();
			});
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

	// MODAL ENVOI EN COURS
	const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
	const [textLoading, setTextLoading] = useState(
		"Enregistrement en cours ..."
	);

	return (
		<KeyboardAwareScrollView extraScrollHeight={100}>
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.header}>
						<Image
							source={{ uri: product.image }}
							style={styles.image}
						/>
						<View style={styles.headerInfo}>
							<Text style={styles.title}>{product.name}</Text>
							<Text style={styles.subtitle}>{product.brand}</Text>
							<Text style={styles.subtitle}>
								Ref: {product.ref}
							</Text>
						</View>
					</View>
					<View style={{ width: "95%", zIndex: 0 }}>
						<Text style={styles.label}>Titre problème</Text>
						<TextInput
							placeholder="Ex: Bar cassé"
							style={styles.input}
							value={fields.problemTitle}
							onChangeText={(problemTitle) =>
								setFields({
									...fields,
									problemTitle: problemTitle,
								})
							}
						/>
					</View>
					<View style={{ width: "95%", zIndex: 10 }}>
						<Text style={styles.label}>Type de problème</Text>
						<DropDownPicker
							style={[styles.input, { zIndex: 2 }]}
							modalTitle="Type de message"
							placeholder="Choisissez votre type de message"
							open={openDropDown}
							value={problemsTypeSelected}
							items={problemsType}
							setOpen={setOpenDropDown}
							setValue={setProblemsTypeSelected}
							setItems={setProblemsType}
							theme="DARK"
							mode="BADGE"
							zIndex={1000}
							zIndexInverse={1000}
							scrollViewProps={{
								decelerationRate: "fast",
							}}
							modalProps={{
								animationType: "slide",
							}}
							listMode="FLATLIST"
						/>
					</View>
					<View style={{ width: "95%", zIndex: 0 }}>
						<Text style={styles.label}>
							Localisation du problème
						</Text>
						<TextInput
							placeholder="Entrez la localisation"
							style={styles.input}
							value={fields.problemLocalisation}
							onChangeText={(problemLocalisation) =>
								setFields({
									...fields,
									problemLocalisation: problemLocalisation,
								})
							}
						/>
					</View>

					<View style={{ width: "95%" }}>
						<Text style={styles.label}>Description</Text>
						<TextInput
							placeholderTextColor={"#404040"}
							placeholder="Description détaillée"
							style={[styles.input, { height: 100 }]}
							value={fields.description}
							onChangeText={(description) =>
								setFields({
									...fields,
									description: description,
								})
							}
							multiline
						/>
					</View>
					<View style={{ flexDirection: "row" }}>
						<TouchableOpacity
							style={styles.button}
							onPress={takeImage}
						>
							<Text style={styles.buttonText}>Caméra</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={pickImage}
						>
							<Text style={styles.buttonText}>Fichier</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.imagesContainer}>
						{images.slice(0, 3).map(({ uri, base64 }) => (
							<TouchableWithoutFeedback
								key={uri}
								onPress={() => handleImageClick(uri)}
							>
								<Image
									source={{ uri }}
									key={uri}
									style={styles.image_prise}
								/>
							</TouchableWithoutFeedback>
						))}
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
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalLoadingVisible}
						onRequestClose={() => {
							setModalLoadingVisible(!modalLoadingVisible);
						}}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>
									{textLoading}
								</Text>
							</View>
						</View>
					</Modal>
					<TouchableOpacity
						style={styles.button}
						onPress={handleSubmit}
					>
						<Text style={styles.buttonText}>Envoyer</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
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
