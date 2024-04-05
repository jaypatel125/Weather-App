// I Jay Patel, 000881881 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  ImageBackground,
} from "react-native";

import WeatherComponent from "./components/current";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [cities, setCities] = useState([
    "New York",
    "Hamilton",
    "London",
    "New Delhi",
    "Ahmedabad",
  ]);

  const [newCityName, setNewCityName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setKey(Date.now().toString());
  }, [cities]);

  const [key, setKey] = useState(Date.now().toString());

  const handleAddCity = () => {
    if (newCityName.trim() !== "") {
      setCities([...cities, newCityName.trim()]);
      setSelectedIndex(cities.length);
      setNewCityName("");
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setNewCityName("");
      setSelectedIndex(cities.length);
    }
  };

  const handleDeleteCity = (deletedCity) => {
    const updatedCities = cities.filter((city) => city !== deletedCity);
    setCities(updatedCities);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      {showSearch ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            placeholderTextColor={theme === "light" ? "#000" : "#fff"}
            value={newCityName}
            onChangeText={(text) => setNewCityName(text)}
          />
          {newCityName.trim() !== "" ? (
            <Button
              style={styles.addButtonText}
              title="Add City"
              onPress={handleAddCity}
            />
          ) : (
            <Ionicons
              name="close"
              size={30}
              color={theme === "light" ? "#000" : "#fff"}
              style={styles.cancelIcon}
              onPress={toggleSearch}
            />
          )}
        </View>
      ) : (
        <View style={styles.header}>
          <Ionicons
            name="search-outline"
            size={30}
            color={theme === "light" ? "#000" : "#fff"}
            style={styles.searchIcon}
            onPress={toggleSearch}
          />
          <Ionicons
            name={theme === "light" ? "moon-outline" : "sunny-outline"}
            size={30}
            marginLeft={10}
            color={theme === "light" ? "#000" : "#fff"}
            onPress={toggleTheme}
          />
        </View>
      )}

      {cities.length === 0 ? (
        <Text
          style={[
            styles.noCityText,
            { color: theme === "light" ? "#000" : "#fff" },
          ]}
        >
          No city added
        </Text>
      ) : (
        <Swiper
          key={key}
          style={styles.wrapper}
          showsPagination={true}
          index={selectedIndex}
        >
          {cities.map((city, index) => (
            <View key={city} style={styles.slide}>
              <WeatherComponent
                city={city}
                onDelete={handleDeleteCity}
                theme={theme}
              />
            </View>
          ))}
        </Swiper>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5c294a",
    color: "#000",
  },
  containerDark: {
    backgroundColor: "#5c294a",
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 60,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 20,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#2b2b2b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 70,
  },
  cancelIcon: {
    marginRight: 10,
  },
  searchIcon: {
    marginLeft: 300,
  },
  wrapper: {},
  slide: {
    backgroundColor: "#121212",
  },
  noCityText: {
    textAlign: "center",
    paddingTop: 175,
    fontSize: 18,
    backgroundColor: "#121212",
    height: "100%",
  },
});
