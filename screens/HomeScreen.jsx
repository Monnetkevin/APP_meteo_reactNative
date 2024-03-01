import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Pressable,
} from "react-native";
import { theme } from "../components/theme/Theme";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import City from "../components/CityWeather/City";
import DayWeather from "../components/CityWeather/DayWeather";
import { API_KEY } from "../components/utils/Api";

function HomeScreen() {
  const [locations, setLocation] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const getCurrentWeather = async () => {
    try {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&lang=fr&appid=${API_KEY}`
        )
        .then((res) => {
          setLocation(res.data);
          setIsLoaded(true);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, [isLoaded]);

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={20}
        style={styles.imgBg}
        source={require("../assets/images/bg.jpg")}
      >
        {/* Bar de recherche */}
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.search}>
              <TextInput
                placeholder="Recherche ville"
                placeholderTextColor={"lightgray"}
                onChangeText={setSearchCity}
                style={styles.searchInput}
              />

              <Pressable
                style={styles.searchIcon}
                value={searchCity}
                onPressIn={getCurrentWeather}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Pressable>
            </View>
          </View>
          {/* <View>{locations.length > 0 && <View></View>}</View> */}
        </SafeAreaView>
        {locations !== null && isLoaded === true && (
          <View style={styles.weatherContainer}>
            <City location={locations} />

            <View style={styles.dailyContainer}>
              <DayWeather location={locations.name} />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  weatherContainer: {
    display: "flex",
    flex: 1,
  },
  dailyContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  imgBg: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  safeAreaContainer: {
    flexDirection: "row",
    margin: 30,
  },
  searchContainer: {
    position: "relative",
    zIndex: 50,
    marginTop: 20,
    marginBottom: 20,
  },
  search: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: theme.bgWhite(0.2),
  },
  searchInput: {
    paddingLeft: 60,
    width: "100%",
    color: "white",
  },
  searchIcon: {
    borderRadius: 50,
    padding: 10,
    margin: 5,
    backgroundColor: theme.bgWhite(0.3),
  },
});
