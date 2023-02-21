import {
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    Platform,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import EditScreenInfo from "../components/EditScreenInfo";
  import { Text, View } from "../components/Themed";
  import { FontAwesome } from "@expo/vector-icons";
  import User from "../assets/images/user.png";

  export default function AccountScreen({
    navigation,
  }: RootTabScreenProps<"AccountScreen">) {

  
    return (
      <View>
        <ScrollView>
          <View>
            <View style={styles.container_character}>
             
              <View style={styles.username}>
                 <Image style={styles.user_img} source={User}></Image>
                 <View style={styles.client_data}>
                <Text style={{ fontSize: 18 }}>Client</Text>
         
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Michel Michel
                </Text>
                 </View>
              </View>
            </View>
            <View style={styles.maincontainer_userinformation}>
              <Text style={{ fontWeight: "bold", fontSize: 15, paddingBottom: 10 }}>Mes informations</Text>
              <View style={styles.container_userinformation}>
                <View style={styles.userinformation}>
                  <FontAwesome
                    name="user"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{}}>
                    x
                  </Text>
                </View>
                <View style={styles.userinformation}>
                  <FontAwesome
                    name="phone"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{}}>x</Text>
                </View>
                <View style={styles.userinformation}>
                  <FontAwesome
                    name="inbox"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{}}>x</Text>
                </View>
                <View style={styles.userinformation}>
                  <FontAwesome
                    name="font-awesome"
                    size={25}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{}}>x</Text>
                </View>
              </View>
            </View>
          </View>
        
        </ScrollView>
      </View>
    );
  }
  
  const { width: screenWidth } = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    imageContainer: {
      flex: 1,
      borderRadius: 5,
      marginBottom: Platform.select({ ios: 0, android: 1 }),
    },
    client_data: {
    backgroundColor: "transparent",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 40,
    },
    username: {
      fontSize: 20,
      textAlign: "center",
      backgroundColor: "transparent",
      flexDirection: "row",
    },
    userinformation: {
      flex: 1,
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
    },
    item: {
      width: "100%",
      height: screenWidth - 20,
    },
    stats_number: {
      backgroundColor: "black",
      color: "white",
      fontSize: 20,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: "contain",
    },
    stats1: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
    },
    stats2: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
    },
    container_character: {
      backgroundColor: "#d3d3d3",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
    },
    container_text: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
   
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  
    maincontainer_userinformation: {
      transform: [{ translateX: 30 }],
      marginTop: 30,
    },
    user_img: {
      width : 150,
      height: 150,
      margin: 10,
      resizeMode: "contain",
    }
  });
  