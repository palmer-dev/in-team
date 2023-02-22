import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { Text, View } from "../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { RootTabScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalCharacterChanger({
  navigation,
}: RootTabScreenProps<"ModalCharacterChanger">) {
  const [category_list, setCategoryList] = React.useState([
    {
      id: 1,
      name: "Modifier mes informations",
      bgColor: "#BF012C",
      url: "UserEditScreen",
    },
    {
      id: 2,
      name: "Notifications",
      bgColor: "#BF012C",
      url: "NotificationScreen",
    },
    {
      id: 3,
      name: "Sécurité",
      bgColor: "#BF012C",
      url: "SecurityScreen",
    },
    {
      id: 4,
      name: "Aide",
      bgColor: "#BF012C",
      url: "HelpScreen",
    },
    {
      id: 5,
      name: "A propos",
      bgColor: "#BF012C",
      url: "AboutScreen",
    },
  ]);

  function renderCategoryList(item, index) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.url, {});
        }}
      >
        <View
          style={{
            height: 20,
            display: "flex",
            margin: 6,
            padding: 20,

            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "transparent",
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text
              style={{
                height: 20,
                textDecorationColor: "#212121",
              }}
            >
              {item.name}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <FontAwesome
              name="caret-right"
              size={20}
              color="black"
              style={{ height: 20, width: 20 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView>
      <FlatList
        data={category_list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => renderCategoryList(item, index)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
