import {
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

// définition du regex pour le mot de passe
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export default function SecurityScreen() {
  // Initialisation des différents champs contenant les infos du formulaire et des états pour afficher les mots de passe (définit en false)
  const [fields, setFields] = useState({
    oldPassword: "",
    newPassword: "",
    verifyPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showVerifyPassword: false,
  });

  // Initialisation des messages d'erreur pour chaque champs
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    verifyPassword: "",
  });

  // Initialisation de la fonction handlSubmit une fois le formulaire soumis
  const handleSubmit = () => {
    let isValid = true;

    // vérifie si le champs oldPassword contient une information -> si non, affichage d'un message d'erreur et isValid passe en false
    if (!fields.oldPassword.trim()) {
      isValid = false;
      setError({
        ...error,
        oldPassword: "L'ancien mot de passe est requis",
      });
    }

    // vérifie la compatibilité entre le nouveau mot de passe et la confirmation
    // si non, isValid passe en false et affichage d'un message d'erreur
    if (fields.newPassword.trim() !== fields.verifyPassword.trim()) {
      isValid = false;
      setError({
        ...error,
        verifyPassword: "Les mots de passe ne correspondent pas",
      });
    }

    // vérifie la compatibilité des mots de passe avec le regex
    // si non, isValid passe en false et affichage d'un message d'erreur suur les conditions à respecter
    if (
      !passwordRegex.test(fields.newPassword.trim()) ||
      passwordRegex.test(fields.verifyPassword.trim())
    ) {
      isValid = false;
      setError({
        ...error,
        newPassword:
          "Le nouveau mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et 8 caractères minimum",
      });
    }

    // si isValid est toujours en true, affichage d'un message d'alerte (temporaire)
    if (isValid) {
      Alert.alert("Mot de passe modifié avec succès!");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Modifier votre mot de passe</Text>

        {/* Première view pour le champ de l'ancien mot de passe */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ancien mot de passe</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrez votre mot de passe actuel"
            value={fields.oldPassword}
            // propriété pour masquer automatiquement la saisie dans l'input
            secureTextEntry={!fields.showOldPassword}
            // fonction pour mettre à jour le champs lorsque l'utilisateur saisie une info
            onChangeText={(oldPassword) => {
              setFields({ ...fields, oldPassword: oldPassword });
              setError({ ...error, oldPassword: "" });
            }}
          />
          {/* Icone pour afficher ou non le mot de passe */}
          <Icon
            style={styles.icon}
            name={fields.showOldPassword ? "eye" : "eye-off"}
            size={20}
            color="#666"
            // fonction pour mettre à jour l'état du champs lors du clique (ici montrer ou cacher)
            onPress={() =>
              setFields({ ...fields, showOldPassword: !fields.showOldPassword })
            }
          />
          {/* Affichage des messages d'erreur (si input est vide) */}
          {error.oldPassword !== "" && (
            <Text style={styles.error}>{error.oldPassword}</Text>
          )}
        </View>

        {/* Deuxième view pour le champ du nouveau mot de passe */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nouveau mot de passe</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Entrer le nouveau mot de passe"
            value={fields.newPassword}
            // propriété pour masquer automatiquement la saisie dans l'input
            secureTextEntry={!fields.showNewPassword}
            // fonction pour mettre à jour le champs lorsque l'utilisateur saisie une info
            onChangeText={(newPassword) => {
              setFields({ ...fields, newPassword: newPassword });
              setError({ ...error, newPassword: "" });
            }}
          />
          {/* Icone pour afficher ou non le mot de passe */}
          <Icon
            style={styles.icon}
            name={fields.showNewPassword ? "eye" : "eye-off"}
            size={20}
            color="#666"
            // fonction pour mettre à jour l'état du champs lors du clique (ici montrer ou cacher)
            onPress={() =>
              setFields({ ...fields, showNewPassword: !fields.showNewPassword })
            }
          />

          {/* Affichage des messages d'erreur (si input est vide ou ne correspond pas au regex) */}
          {error.newPassword !== "" && (
            <Text style={styles.error}>{error.newPassword}</Text>
          )}
        </View>

        {/* Troisième view pour le champ de confirmation du mot de passe */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmez le nouveau mot de passe</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirmez le nouveau mdp"
            value={fields.verifyPassword}
            // propriété pour masquer automatiquement la saisie dans l'input
            secureTextEntry={!fields.showVerifyPassword}
            // fonction pour mettre à jour le champs lorsque l'utilisateur saisie une info
            onChangeText={(verifyPassword) => {
              setFields({ ...fields, verifyPassword: verifyPassword });
              setError({ ...error, verifyPassword: "" });
            }}
          />
          {/* Icone pour afficher ou non le mot de passe */}
          <Icon
            style={styles.icon}
            name={fields.showVerifyPassword ? "eye" : "eye-off"}
            size={20}
            color="#666"
            // fonction pour mettre à jour l'état du champs lors du clique (ici montrer ou cacher)
            onPress={() =>
              setFields({
                ...fields,
                showVerifyPassword: !fields.showVerifyPassword,
              })
            }
          />
          {/* Affichage des messages d'erreur (si input est vide ou ne correspond pas au nouveau mot de passe) */}
          {error.verifyPassword !== "" && (
            <Text style={styles.error}>{error.verifyPassword}</Text>
          )}
        </View>
        {/* Bouton qui renvoi à la fonction handleSubmit (voir plus haut) */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enregistrer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    marginTop: 25,
    color: "#E7E349",
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
    position: "relative",
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 66,
  },
  inputContainer: {
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    marginHorizontal: 30,
    backgroundColor: "#003D5C",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});
