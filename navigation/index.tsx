import React, { useEffect, useReducer, useRef } from "react";
import {
	Pressable,
	StatusBar,
	StyleSheet,
	View,
	Text,
	LayoutChangeEvent,
	ColorSchemeName,
	TouchableHighlight,
	TouchableOpacity,
	Image,
} from "react-native";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import {
	BottomTabBarProps,
	BottomTabNavigationOptions,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// svg
import Svg, { Path } from "react-native-svg";
// reanimated
import Animated, {
	useAnimatedStyle,
	withTiming,
	useDerivedValue,
} from "react-native-reanimated";
// lottie
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomePageScreen from "../screens/HomePageScreen";
import AccountScreen from "../screens/AccountScreen";
import ScanScreen from "../screens/ScanScreen";
import SignalScreen from "../screens/SignalScreen";
import ModalCharacterChanger from "../screens/ModalCharacterChanger";
import AboutScreen from "../screens/profilSettings/AboutScreen";
import HelpScreen from "../screens/profilSettings/HelpScreen";
import NotificationScreen from "../screens/profilSettings/NotificationScreen";
import SecurityScreen from "../screens/profilSettings/SecurityScreen";
import UserEditScreen from "../screens/profilSettings/UserEditScreen";
import SignalProductScreen from "../screens/SignalProductScreen";
import ProductScreen from "../screens/ProductScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignalementUniqueScreen from "../screens/SignalementUniqueScreen";
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import LinkingConfiguration from "./LinkingConfiguration";
import LogoInteam from "../assets/images/logo-iteam.png";
import LoginScreen from "../screens/auth/LoginScreen";
import PasswordForgetScreen from "../screens/auth/PasswordForgetScreen";
import LogOutScreen from "../screens/auth/LogOutScreen";
import { logout } from "../hooks/useDatabase";

// ------------------------------------------------------------------
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
const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const Stack = createNativeStackNavigator<RootStackParamList>();
// ------------------------------------------------------------------
function RootNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="LogIn"
			screenOptions={{
				headerShown: false,
			}}
		>
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
				<Stack.Screen
					name="ProductScreen"
					component={ProductScreen}
					options={({ route, navigation }) => ({
						title: "Produit",
						headerShown: true,
					})}
				/>
				<Stack.Screen
					name="SignalementUniqueScreen"
					component={SignalementUniqueScreen}
					options={({ route, navigation }) => ({
						title: "Historique",
						headerShown: true,
					})}
				/>
				<Stack.Screen
					name="SignalProductScreen"
					component={SignalProductScreen}
					options={({ route, navigation }) => ({
						title: "Signaler un problème",
						headerShown: true,
					})}
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
					options={({ route, navigation }) => ({
						title: "Notification",
						headerShown: true,
					})}
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
				<Stack.Screen
					name="SignalScreen"
					component={SignalScreen}
					options={({ route, navigation }) => ({
						title: "Signalement",
						headerShown: true,
					})}
				/>
			</Stack.Group>
			<Stack.Screen
				name="LogIn"
				component={LoginScreen}
				options={({ route, navigation }) => ({
					title: "Page de connexion",
				})}
			/>
			<Stack.Screen
				name="LogOut"
				component={LogOutScreen}
				options={({ route, navigation }) => ({
					title: "Page de connexion",
				})}
			/>
			<Stack.Screen
				name="ForgotPassword"
				component={PasswordForgetScreen}
				options={({ route, navigation }) => ({
					title: "Récupération de mot de passe",
				})}
			/>
		</Stack.Navigator>
	);
}
//////
const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<>
			<StatusBar barStyle="light-content" />

			<BottomTab.Navigator
				tabBar={(props) => <AnimatedTabBar {...props} />}
				initialRouteName="HomePage"
			>
				<BottomTab.Screen
					name="HomePage"
					component={HomePageScreen}
					options={({
						navigation,
					}: RootTabScreenProps<"HomePage">) => ({
						title: "",
						// @ts-ignore
						tabBarIcon: ({ ref }) => (
							<Lottie
								ref={ref}
								loop={false}
								autoPlay={true}
								source={require("../assets/bottombarlogo/dumbbell.json")}
								style={styles.icondumbbell}
							/>
						),
						headerLeft: () => (
							<Image
								source={LogoInteam}
								style={styles.iconinteam}
							/>
						),
						headerRight: () => (
							<Pressable
								onPress={() =>
									navigation.navigate("SignalScreen")
								}
								style={({ pressed }) => ({
									opacity: pressed ? 0.4 : 1,
								})}
							>
								<FontAwesome
									name="history"
									size={25}
									color={"grey"}
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
						title: "",
						// @ts-ignore
						tabBarIcon: ({ ref }) => (
							<Lottie
								ref={ref}
								loop={false}
								autoPlay={true}
								source={require("../assets/bottombarlogo/qrcode.json")}
								style={styles.iconqrcode}
							/>
						),
						headerLeft: () => (
							<Image
								source={LogoInteam}
								style={styles.iconinteam}
							/>
						),
					}}
				/>
				<BottomTab.Screen
					name="AccountScreen"
					component={AccountScreen}
					options={({
						navigation,
					}: RootTabScreenProps<"AccountScreen">) => ({
						title: "Mon compte",
						tabBarIcon: ({ ref }) => (
							<Lottie
								ref={ref}
								loop={false}
								autoPlay={true}
								source={require("../assets/bottombarlogo/user.json")}
								style={styles.icon}
							/>
						),
						headerRight: () => (
							<Pressable
								onPress={() =>
									navigation.navigate("ModalCharacterChanger")
								}
								style={({ pressed }) => ({
									opacity: pressed ? 0.4 : 1,
									scale: 1,
								})}
							>
								<FontAwesome
									name="align-right"
									size={25}
									color={"grey"}
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
									opacity: pressed ? 0.4 : 1,
									scale: 1,
								})}
							>
								<FontAwesome
									name="sign-out"
									size={25}
									color={"grey"}
									style={{ marginLeft: 15 }}
								/>
							</Pressable>
						),
					})}
				/>
			</BottomTab.Navigator>
		</>
	);
}

// ------------------------------------------------------------------

const PlaceholderScreen = () => {
	return <View style={{ flex: 1, backgroundColor: "#003D5C" }} />;
};

// ------------------------------------------------------------------

const AnimatedTabBar = ({
	state: { index: activeIndex, routes },
	navigation,
	descriptors,
}: BottomTabBarProps) => {
	const { bottom } = useSafeAreaInsets();

	// get information about the components position on the screen -----

	const reducer = (state: any, action: { x: number; index: number }) => {
		// Add the new value to the state
		return [...state, { x: action.x, index: action.index }];
	};

	const [layout, dispatch] = useReducer(reducer, []);
	// console.log(layout);

	const handleLayout = (event: LayoutChangeEvent, index: number) => {
		dispatch({ x: event.nativeEvent.layout.x, index });
	};

	// animations ------------------------------------------------------

	const xOffset = useDerivedValue(() => {
		// Our code hasn't finished rendering yet, so we can't use the layout values
		if (layout.length !== routes.length) return 0;
		// We can use the layout values
		// Copy layout to avoid errors between different threads
		// We subtract 25 so the active background is centered behind our TabBar Components
		// 20 pixels is the width of the left part of the svg (the quarter circle outwards)
		// 5 pixels come from the little gap between the active background and the circle of the TabBar Components
		return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
		// Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
		// or the layout changes (e.g. when the components haven't finished rendering yet)
	}, [activeIndex, layout]);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			// translateX to the calculated offset with a smooth transition
			transform: [
				{ translateX: withTiming(xOffset.value, { duration: 250 }) },
			],
		};
	});

	return (
		<View style={[styles.tabBar, { paddingBottom: bottom }]}>
			<AnimatedSvg
				width={110}
				height={60}
				viewBox="0 0 110 60"
				style={[styles.activeBackground, animatedStyles]}
			>
				<Path
					fill="#003D5C"
					d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
				/>
			</AnimatedSvg>

			<View style={styles.tabBarContainer}>
				{routes.map((route, index) => {
					const active = index === activeIndex;
					const { options } = descriptors[route.key];

					return (
						<TabBarComponent
							key={route.key}
							active={active}
							options={options}
							onLayout={(e) => handleLayout(e, index)}
							onPress={() => navigation.navigate(route.name)}
						/>
					);
				})}
			</View>
		</View>
	);
};

// ------------------------------------------------------------------

type TabBarComponentProps = {
	active?: boolean;
	options: BottomTabNavigationOptions;
	onLayout: (e: LayoutChangeEvent) => void;
	onPress: () => void;
};

const TabBarComponent = ({
	active,
	options,
	onLayout,
	onPress,
}: TabBarComponentProps) => {
	// handle lottie animation -----------------------------------------
	const ref = useRef(null);

	useEffect(() => {
		if (active && ref?.current) {
			// @ts-ignore
			ref.current.play();
		}
	}, [active]);

	// animations ------------------------------------------------------

	const animatedComponentCircleStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: withTiming(active ? 1 : 0, { duration: 250 }),
				},
			],
		};
	});

	const animatedIconContainerStyles = useAnimatedStyle(() => {
		return {
			opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
		};
	});

	return (
		<Pressable
			onPress={onPress}
			onLayout={onLayout}
			style={styles.component}
		>
			<Animated.View
				style={[styles.componentCircle, animatedComponentCircleStyles]}
			/>
			<Animated.View
				style={[styles.iconContainer, animatedIconContainerStyles]}
			>
				{/* @ts-ignore */}
				{options.tabBarIcon ? (
					options.tabBarIcon({ ref })
				) : (
					<Text>?</Text>
				)}
			</Animated.View>
		</Pressable>
	);
};

// ------------------------------------------------------------------

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: "white",
	},
	activeBackground: {
		position: "absolute",
	},
	tabBarContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	component: {
		height: 60,
		width: 60,
		marginTop: -5,
	},
	componentCircle: {
		flex: 1,
		borderRadius: 30,
		backgroundColor: "white",
	},
	iconContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		height: 36,
		width: 36,
	},
	icondumbbell: {
		height: 60,
		width: 60,
	},
	iconinteam: {
		height: 45,
		width: 60,
		resizeMode: "stretch",
		marginLeft: 10,
	},
	iconqrcode: {
		height: 60,
		width: 60,
	},
});
