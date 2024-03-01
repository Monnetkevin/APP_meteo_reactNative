import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import DayWeather from "./DayWeather";
import { GlobalContext } from "../../App";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../theme/Theme";

function City({ location }) {
  const { token } = useContext(GlobalContext);
  return (
    <View style={styles.container}>
      <Text style={styles.textName}>{location.name}</Text>
      <View style={styles.weatherContainer}>
        <Image
          source={{
            uri: `http://openweathermap.org/img/w/${location.weather[0].icon}.png`,
          }}
          style={styles.weatherImg}
        />
        <View>
          <Text style={styles.temp}>{location.main.temp}°C</Text>
          <Text style={styles.weatherDescription}>
            {location.weather[0].description}
          </Text>
        </View>
      </View>
      {token && (
        <View style={styles.favouriteContainer}>
          <Pressable style={styles.favourite}>
            <Text style={styles.DayText}>Ajouter au favoris</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default City;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  favouriteContainer: {
    alignItems: "center",
    marginLeft: 25,
    marginBottom: 25,
  },
  favourite: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    backgroundColor: theme.bgWhite(0.2),
  },
  DayText: {
    color: "white",
  },
  weatherContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  temp: {
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 25,
  },
  weatherDescription: {
    color: "white",
    marginTop: 20,
  },
  weatherImg: {
    height: 200,
    width: 200,
    justifyContent: "center",
  },
});
