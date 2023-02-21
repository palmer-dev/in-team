import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Searchbar from "../components/SearchFilter";
import HorizontalScrollMenu, {
  RouteProps,
} from "@nyashanziramasanga/react-native-horizontal-scroll-menu/src";

export default function HomePageScreen({
  navigation,
}: RootTabScreenProps<"HomePage">) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const NavigationTabs = [
    { id: 1, name: "Accessory" },
    { id: 2, name: "BAG" },
    { id: 3, name: "BALL" },
    { id: 4, name: "BAND" },
    { id: 5, name: "Dumbbell" },
    { id: 6, name: "KETTLE BELL" },
    { id: 7, name: "MAGNETS" },
    { id: 8, name: "NEO FIT BELL" },
    { id: 9, name: "OLYMPIC RINGS" },
    { id: 10, name: "Plate" },
    { id: 11, name: "ROPE" },
    { id: 12, name: "TUBING" },
  ];
  const onPress = (route: RouteProps) => {
    setSelectedIndex(route.id);
    console.log("Tab pressed", route);
  };

  const [value, setValue] = useState();
  function updateSearch(value) {
    console.log(value);
  }

  return (
    <View>
      <Searchbar
        value={value}
        updateSearch={updateSearch}
        style={{ marginTop: "8%" }}
      />
      <HorizontalScrollMenu
        items={NavigationTabs}
        onPress={onPress}
        selected={selectedIndex}
        activeBackgroundColor={"#003D5C"}
        activeTextColor={"white"}
        itemWidth={80}
        scrollAreaStyle={{ height: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
