import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { theme } from "../components/theme/Theme";
import { GlobalContext } from "../App";
import axios from "axios";

const DeconnexionScreen = ({ navigation }) => {
  const { token, setToken } = useContext(GlobalContext);

  const logout = async () => {
    if (token) {
      try {
        await axios.post("http://192.168.1.13:8000/api/logout", null, {
          headers: {
            Authorization: "Bearer" + SecureStore.getItem("access_token"),
          },
        });
        await SecureStore.deleteItemAsync("access_token");
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={20}
        style={styles.imgBg}
        source={require("../assets/images/bg.jpg")}
      >
        <View style={styles.deconnexionContainer}>
          <Pressable style={styles.deconnexion} onPressIn={logout}>
            <Text>Deconnexion</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DeconnexionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  imgBg: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  deconnexionContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
  },
  deconnexion: {
    borderRadius: 50,
    backgroundColor: theme.bgWhite(0.2),
    marginBottom: 15,
    padding: 10,
  },
});
