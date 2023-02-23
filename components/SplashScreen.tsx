import React, { useEffect, useRef } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import Svg from "react-native-svg";
import useColorScheme from "../hooks/useColorScheme";
// Import de animation du tracé du text "Next-"
import AnimatedStroke from "./AnimatedSplashLogo/AnimatedLogo";
// Import du U animer

// Couleur animation du logo
const colors = ["#E20613", "#FF8D00", "#0086CD", "#003D5C"];

// GLOBAL FACTEUR
const FACTEUR_REDUCTION = 64;

// ************* SVG "NEXT-"
// Margin du svg
const MARGIN = 20;
// Definition de la taille de la fenêtre du svg
const vWidth = 148 + MARGIN;
const vHeight = 107 + MARGIN;
// Definition de la taille  du svg
const width = Dimensions.get("window").width - FACTEUR_REDUCTION;
const height = (width * vHeight) / vWidth;

// Svg du text sans le "U" et le "education group"
const paths = [
  "M77.1012 45.4589L49.2836 17.6413C44.5973 12.955 36.9994 12.955 32.3131 17.6413L4.49548 45.4589C-0.190815 50.1452 -0.190814 57.7432 4.49548 62.4295L32.3131 90.2471C36.9994 94.9334 44.5973 94.9334 49.2836 90.2471L77.1012 62.4295C81.7875 57.7432 81.7875 50.1452 77.1012 45.4589Z",
  "M144.181 45.4561L103.225 4.50051C98.5387 -0.185786 90.9407 -0.185786 86.2544 4.50051L45.2988 45.4561C40.6125 50.1424 40.6125 57.7404 45.2988 62.4267L86.2544 103.382C90.9407 108.069 98.5387 108.069 103.225 103.382L144.181 62.4267C148.867 57.7404 148.867 50.1424 144.181 45.4561Z",
  "M138.425 45.4561L103.225 10.2564C98.5387 5.57007 90.9407 5.57007 86.2544 10.2564L51.0547 45.4561C46.3684 50.1424 46.3684 57.7404 51.0547 62.4267L86.2544 97.6264C90.9407 102.313 98.5387 102.313 103.225 97.6264L138.425 62.4267C143.111 57.7404 143.111 50.1424 138.425 45.4561Z",
  "M72.7525 45.4519L49.2836 21.983C44.5973 17.2967 36.9994 17.2967 32.3131 21.983L8.8442 45.4519C4.15791 50.1381 4.15791 57.7361 8.8442 62.4224L32.3131 85.8913C36.9994 90.5776 44.5973 90.5776 49.2836 85.8913L72.7525 62.4224C77.4388 57.7361 77.4388 50.1381 72.7525 45.4519Z",
  "M92.09 41.7V66.29L92.42 66.62L92.91 66.96L93.59 67.01L94.14 66.96L106.4 54.67L106.61 54.28V53.36L94.14 40.96L93.22 40.87L92.58 41.06L92.26 41.38L92.09 41.7Z",
];

const SplashScreen = () => {
  // Theme de couleur mode sombre et light
  const colorSchema = useColorScheme();
  colorSchema == "dark" ? "couleurDark" : "couleurLight";
  // Container view de la splashscreen
  const progress = useSharedValue(0);
  useEffect(() => {
    // Durée et type de transition
    progress.value = withTiming(1, { duration: 3000, easing: Easing.linear });
  }, [progress]);
  return (
    <View style={styles.layer}>
      <View style={styles.layersvg2}>
        <Svg
          width={width}
          height={height}
          viewBox={[
            -MARGIN / 2,
            -MARGIN / 2,
            vWidth + MARGIN / 2,
            vHeight + MARGIN / 2,
          ].join(" ")}
        >
          {paths.map((d, key) => (
            <AnimatedStroke progress={progress} d={d} key={key} />
          ))}
        </Svg>
      </View>
    </View>
  );
};
// Css de la splash
const styles = StyleSheet.create({
  // Container principal
  layer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#003D5C",
  },
  // Container du svg 1

  // Container du svg 2
  layersvg2: {
    justifyContent: "center",
    position: "absolute",
    left: "8%",
  },
});
export default SplashScreen;
