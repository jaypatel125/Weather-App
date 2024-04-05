// I Jay Patel, 000881881 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
} from "react-native";

const API_KEY = "518c6dee5ac84859b9714513242903";

const Tile = ({ title, value, theme }) => (
  <View
    style={[
      styles.tile,
      {
        backgroundColor:
          theme === "light"
            ? "rgba(240, 240, 240, 0.4)"
            : "rgba(51, 51, 51, 0.4)",
      },
    ]}
  >
    <Text
      style={[styles.tileTitle, { color: theme === "light" ? "#000" : "#fff" }]}
    >
      {title}
    </Text>
    <Text
      style={[styles.tileData, { color: theme === "light" ? "#000" : "#fff" }]}
    >
      {value}
    </Text>
  </View>
);

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
      <ImageBackground
        source={require("../images/background.jpeg")}
        style={[styles.container, theme === "dark" && styles.containerDark]}
      >
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
                {[
                  {
                    title: "Humidity",
                    value: `${weatherData.current.humidity}%`,
                  },
                  {
                    title: "Wind Speed",
                    value: `${weatherData.current.wind_kph} km/h`,
                  },
                  { title: "Direction", value: weatherData.current.wind_dir },
                  {
                    title: "Pressure",
                    value: `${weatherData.current.pressure_mb} mb`,
                  },
                ].map(({ title, value }) => (
                  <Tile key={title} title={title} value={value} theme={theme} />
                ))}
              </View>
              <View style={styles.column}>
                {[
                  {
                    title: "Visibility",
                    value: `${weatherData.current.vis_km} km`,
                  },
                  {
                    title: "Feels Like",
                    value: `${Math.round(weatherData.current.feelslike_c)}°`,
                  },
                  {
                    title: "Precipitation",
                    value: `${weatherData.current.precip_mm} mm`,
                  },
                  { title: "UV Index", value: weatherData.current.uv },
                ].map(({ title, value }) => (
                  <Tile key={title} title={title} value={value} theme={theme} />
                ))}
              </View>
            </View>
            <Button title="Delete" onPress={handleDelete} />
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
