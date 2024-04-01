import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const AddCityPage = ({ onAddCity }) => {
  const [cityName, setCityName] = useState("");
  const [searchedCity, setSearchedCity] = useState("");

  const handleAddCity = () => {
    if (cityName.trim() !== "") {
      onAddCity(cityName.trim());
      setCityName(""); // Clear input after adding city
    }
  };

  const handleSearchCity = async () => {
    if (searchedCity.trim() !== "") {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=YOUR_API_KEY`
        );
        // Handle the response data, e.g., display the city's weather information
        Alert.alert(
          "City Weather",
          `Current weather in ${searchedCity}: ${JSON.stringify(
            response.data.weather[0].description
          )}`
        );
      } catch (error) {
        Alert.alert("Error", "City not found or API request failed.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <Button title="Add City" onPress={handleAddCity} />

      {/* New section for city search */}
      <TextInput
        style={styles.input}
        placeholder="Search city by name"
        value={searchedCity}
        onChangeText={(text) => setSearchedCity(text)}
      />
      <Button title="Search City" onPress={handleSearchCity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
});

export default AddCityPage;
