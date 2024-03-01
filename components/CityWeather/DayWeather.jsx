import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { theme } from "../theme/Theme";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { API_KEY } from "../utils/Api";

function DayWeather({ location }) {
  const [daily, setDaily] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getCurrentDaily = async () => {
    try {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&lang=fr&appid=${API_KEY}`
        )
        .then((res) => {
          setDaily(res.data.list);
          setIsLoaded(true);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCurrentDaily();
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.dailyCalendar}>
        <FontAwesomeIcon icon={faCalendarDays} color="white" />
        <Text style={styles.DayText}>Prévision météo</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {isLoaded === true &&
          daily.map((item) => (
            <View style={styles.dailyContainer} key={item.dt}>
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                }}
                style={styles.weatherImg}
              />
              <Text style={styles.DayText}>{item.dt_txt}</Text>
              <Text style={styles.DayTemp}>{item.main.temp}°C</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

export default DayWeather;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    paddingTop: 5,
  },
  dailyCalendar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    marginBottom: 25,
  },
  dailyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: 150,
    padding: 15,
    marginRight: 10,
    backgroundColor: theme.bgWhite(0.2),
  },
  weatherImg: {
    height: 100,
    width: 100,
  },
  DayText: {
    color: "white",
    marginLeft: 10,
  },
  DayTemp: {
    color: "white",
    fontSize: 20,
  },
});
