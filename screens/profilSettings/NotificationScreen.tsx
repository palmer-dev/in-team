import { StyleSheet, Platform } from "react-native";
import { Text, View } from "../../components/Themed";
import React, { useState } from "react";
import { Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  const [mainswitchValue, setMainSwitchValue] = useState(false);
  const toggleMainSwitch = () => {
    setEventSwitchValue(!mainswitchValue);
    setLevelSwitchValue(!mainswitchValue);
    setGoalSwitchValue(!mainswitchValue);
    setMainSwitchValue((previousState) => !previousState);
  };
  const [eventswitchValue, setEventSwitchValue] = useState(false);
  const [levelswitchValue, setLevelSwitchValue] = useState(false);
  const [goalswitchValue, setGoalSwitchValue] = useState(false);

  // === Couleur du switch principal === //

  //Couleur de la poignée activer
  const mainthumbColorOn = Platform.OS === "android" ? "#76CE32" : "#FDDBD8";
  //Couleur de la poignée desactiver
  const mainthumbColorOff = Platform.OS === "android" ? "#F50F00" : "#FDDBD8";
  //Couleur du tracé derrière la poignée activer
  const maintrackColorOn = Platform.OS === "android" ? "#BAE698" : "#FDDBD8";
  //Couleur du tracé derrière la poignée desactiver
  const maintrackColorOff = Platform.OS === "android" ? "#F96F66" : "#FDDBD8";

  // === Couleur des switch restant ==== //

  //Couleur de la poignée activer
  const secondthumbColorOn = Platform.OS === "android" ? "#ECEEF1" : "#FDDBD8";
  //Couleur de la poignée desactiver
  const secondthumbColorOff = Platform.OS === "android" ? "#43567A" : "#FDDBD8";
  //Couleur du tracé derrière la poignée activer
  const secondtrackColorOn = Platform.OS === "android" ? "#43567A" : "#FDDBD8";
  //Couleur du tracé derrière la poignée desactiver
  const secondtrackColorOff = Platform.OS === "android" ? "#ECEEF1" : "#FDDBD8";

  return (
    <SafeAreaView>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View style={styles.horizontalSection}>
          <Text>Désactiver tout</Text>
          <Switch
            onValueChange={toggleMainSwitch}
            value={mainswitchValue}
            thumbColor={mainswitchValue ? mainthumbColorOn : mainthumbColorOff}
            trackColor={{
              false: maintrackColorOff,
              true: maintrackColorOn,
            }}
            ios_backgroundColor={maintrackColorOff}
            style={styles.switch}
          />
        </View>
        <View style={styles.horizontalSection}>
          <Text>Maintenance</Text>
          <Switch
            onValueChange={setEventSwitchValue}
            value={eventswitchValue}
            thumbColor={
              eventswitchValue ? secondthumbColorOn : secondthumbColorOff
            }
            trackColor={{
              false: secondtrackColorOff,
              true: secondtrackColorOn,
            }}
            ios_backgroundColor={secondtrackColorOff}
          />
        </View>
        <View style={styles.horizontalSection}>
          <Text>Intervention</Text>
          <Switch
            onValueChange={setLevelSwitchValue}
            value={levelswitchValue}
            thumbColor={
              levelswitchValue ? secondthumbColorOn : secondthumbColorOff
            }
            trackColor={{
              false: secondtrackColorOff,
              true: secondtrackColorOn,
            }}
            ios_backgroundColor={secondtrackColorOff}
          />
        </View>
        <View style={styles.horizontalSection}>
          <Text>Ajout d'une machine</Text>
          <Switch
            onValueChange={setGoalSwitchValue}
            value={goalswitchValue}
            thumbColor={
              goalswitchValue ? secondthumbColorOn : secondthumbColorOff
            }
            trackColor={{
              false: secondtrackColorOff,
              true: secondtrackColorOn,
            }}
            ios_backgroundColor={secondtrackColorOff}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  horizontalSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
    marginBottom: 20,
    marginLeft: 20,
  },
  switch: {
    backgroundColor: "white",
  },
});
