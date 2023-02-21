import { StyleSheet, ScrollView, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import React, { useRef } from "react";
import { FormItem, Picker } from "react-native-form-component";
import { Text, View } from "../../components/Themed";

export default function TabTwoScreen({
	navigation,
}: RootTabScreenProps<"AboutScreen">) {
	return (
		<ScrollView style={styles.secureDisplay}>
			<Text style={styles.title}>Politique de confidentialité</Text>
			<Text>
				Le Lorem Ipsum est simplement du faux texte employé dans la
				composition et la mise en page avant impression. Le Lorem Ipsum
				est le faux texte standard de l'imprimerie depuis les années
				1500, quand un imprimeur anonyme assembla ensemble des morceaux
				de texte pour réaliser un livre spécimen de polices de texte. Il
				n'a pas fait que survivre cinq siècles, mais s'est aussi adapté
				à la bureautique informatique, sans que son contenu n'en soit
				modifié.
			</Text>
			<Text style={styles.title}>Conditions d'utilisation</Text>
			<Text>
				On sait depuis longtemps que travailler avec du texte lisible et
				contenant du sens est source de distractions, et empêche de se
				concentrer sur la mise en page elle-même. L'avantage du Lorem
				Ipsum sur un texte générique comme 'Du texte. Du texte. Du
				texte.' est qu'il possède une distribution de lettres plus ou
				moins normale, et en tout cas comparable avec celle du français
				standard. De nombreuses suites logicielles de mise en page ou
				éditeurs de sites Web.
			</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		paddingTop: StatusBar.currentHeight,
	},
	secureDisplay: {
		padding: 20,
		height: "100%",
	},
	title: {
		paddingTop: 15,
		marginBottom: 20,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	labelField: {
		color: "red",
	},
});
