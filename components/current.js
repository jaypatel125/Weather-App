import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const API_KEY = "518c6dee5ac84859b9714513242903";

export default function WeatherComponent({ city, onDelete, theme }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=2`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleDelete = () => {
    onDelete(city);
  };

  return (
    <View style={[styles.container, theme === "dark" && styles.containerDark]}>
      {weatherData ? (
        <View>
          <Text
            style={[
              styles.location,
              { color: theme === "light" ? "#000" : "#fff" },
            ]}
          >
            {weatherData.location.name}
          </Text>

          <Text
            style={[
              styles.temperature,
              { color: theme === "light" ? "#000" : "#fff" },
            ]}
          >
            {Math.round(weatherData.current.temp_c)}°
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                styles.condition,
                { color: theme === "light" ? "#000" : "#fff" },
              ]}
            >
              {weatherData.current.condition.text}
            </Text>
            <Image
              source={{ uri: `http:${weatherData.current.condition.icon}` }}
              style={{ width: 50, height: 50, marginBottom: 7 }}
            />
          </View>

          <View style={styles.tileContainer}>
            <View style={styles.column}>
              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  Humidity
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {weatherData.current.humidity}%
                </Text>
              </View>
              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  Wind Speed
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {weatherData.current.wind_kph} km/h
                </Text>
              </View>

              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  Direction
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {weatherData.current.wind_dir}
                </Text>
              </View>

              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  Pressure
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {weatherData.current.pressure_mb} mb
                </Text>
              </View>
            </View>
            <View style={styles.column}>
              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  Visibility
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {weatherData.current.vis_km} km
                </Text>
              </View>
              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  Feels Like
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {Math.round(weatherData.current.feelslike_c)}°
                </Text>
              </View>
              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  Precipitation
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {weatherData.current.precip_mm} mm
                </Text>
              </View>
              <View
                style={[
                  styles.tile,
                  { backgroundColor: theme === "light" ? "#f0f0f0" : "#333" },
                ]}
              >
                <Text
                  style={[
                    styles.tileTitle,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  UV Index
                </Text>
                <Text
                  style={[
                    styles.tileData,
                    { color: theme === "light" ? "#000" : "#fff" },
                  ]}
                >
                  {weatherData.current.uv}
                </Text>
              </View>
            </View>
          </View>
          <Button title="Delete" onPress={handleDelete} />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10,
    height: "100%",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  location: {
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  condition: {
    fontSize: 25,
    marginBottom: 5,
    textAlign: "center",
  },
  temperature: {
    fontSize: 80,
    textAlign: "center",
  },
  tileContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  column: {
    flex: 1,
  },
  tile: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: "center",
  },
  tileTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  tileData: {
    fontSize: 18,
  },
});
