import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

export default function Searchbar({ value, updateSearch, style }) {
  const [query, setQuery] = useState();
  const [error, setError] = useState();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Image
            style={styles.icSearch}
            source={require("../assets/images/logo-search.png")}
          />
        </View>

        <TextInput
          value={query}
          placeholder="Search"
          style={styles.textInput}
          onChangeText={(text) => {
            setQuery(text);
            updateSearch(text);
            if (error) setError(false);
          }}
          maxLength={12}
        />
      </View>
      {error && <Text style={styles.txtError}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  txtError: {
    marginTop: "2%",
    width: "89%",
    color: "white",
  },
  vwClear: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  icSearch: {
    height: 18,
    width: 18,
  },
  searchContainer: {
    borderRadius: 15,
    backgroundColor: "#D3D8DD",
    width: "90%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  container: {
    height: 50,
    alignItems: "center",
  },
});
