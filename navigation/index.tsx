/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useRef, useEffect } from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomePageScreen from "../screens/HomePageScreen";
import AccountScreen from "../screens/AccountScreen";
import ScanScreen from "../screens/ScanScreen";
import ModalCharacterChanger from "../screens/ModalCharacterChanger";
import AboutScreen from "../screens/profilSettings/AboutScreen";
import HelpScreen from "../screens/profilSettings/HelpScreen";
import NotificationScreen from "../screens/profilSettings/NotificationScreen";
import SecurityScreen from "../screens/profilSettings/SecurityScreen";
import UserEditScreen from "../screens/profilSettings/UserEditScreen";
import SignalProductScreen from "../screens/SignalProductScreen";
import ProductScreen from "../screens/ProductScreen";
import LottieView from "lottie-react-native";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen
          name="SignalProductScreen"
          component={SignalProductScreen}
        />
        <Stack.Screen
          name="UserEditScreen"
          component={UserEditScreen}
          options={({ route, navigation }) => ({
            title: "Information de compte",
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="SecurityScreen"
          component={SecurityScreen}
          options={({ route, navigation }) => ({
            title: "Sécurité",
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="HelpScreen"
          component={HelpScreen}
          options={({ route, navigation }) => ({
            title: "Aide",
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={({ route, navigation }) => ({
            title: "A propos",
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="ModalCharacterChanger"
          component={ModalCharacterChanger}
          options={({ route, navigation }) => ({
            title: "Paramètres",
            headerShown: true,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const animation = useRef(null);
  return (
    <BottomTab.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="HomePage"
        component={HomePageScreen}
        options={({ navigation }: RootTabScreenProps<"HomePage">) => ({
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            // <LottieView
            //   style={{ height: 30, width: 30 }}
            //   source={require("../assets/bottombarlogo/dumbbell.json")}
            //   loop
            // />
            <FontAwesome
              name="info-circle"
              size={25}
              color={Colors[colorScheme].text}
              style={{ marginRight: 15 }}
            />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("SignalScreen")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="history"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="ScanScreen"
        component={ScanScreen}
        options={{
          title: "Scan Screen",
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={({ navigation }: RootTabScreenProps<"AccountScreen">) => ({
          title: "Compte",
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("ModalCharacterChanger")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                scale: 1,
              })}
            >
              <FontAwesome
                name="align-right"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                logout();
                navigation.navigate("LogOut");
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                scale: 1,
              })}
            >
              <FontAwesome
                name="sign-out"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginLeft: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
