import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { theme } from "../components/theme/Theme";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { GlobalContext } from "../App";
import * as SecureStore from "expo-secure-store";

const ConnexionScreen = ({ navigation }) => {
  const { token, setToken, setIsLoaded } = useContext(GlobalContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (data) => {
    try {
      const res = await axios.post("http://192.168.1.13:8000/api/login", data);
      if (res.status === 200) {
        setToken(res.data.data.access_token.token);
        setIsLoaded(true);

        console.log(token);

        const result = await SecureStore.setItemAsync("access_token", token);
        if (result) {
          alert("🔐 Here's your value 🔐 \n" + result);
        } else {
          alert("No values stored under that key.");
        }

        navigation.navigate("Home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={20}
        style={styles.imgBg}
        source={require("../assets/images/bg.jpg")}
      >
        <View style={styles.connexionContainer}>
          <View style={styles.connexion}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={"lightgray"}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.inputEmail}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              Email obligatoire
            </Text>
          )}
          <View style={styles.connexion}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Password"
                  secureTextEntry
                  placeholderTextColor={"lightgray"}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  style={styles.inputPassword}
                />
              )}
              name="password"
            />
          </View>
          {errors.email && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              Mot de passe obligatoire
            </Text>
          )}
          <Pressable
            style={styles.connexionButton}
            onPressIn={handleSubmit(login)}
          >
            <Text style={styles.textButton}>Connexion</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ConnexionScreen;

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
  connexionContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  connexion: {
    borderRadius: 50,
    backgroundColor: theme.bgWhite(0.2),
    marginBottom: 15,
  },
  inputEmail: {
    textAlign: "center",
    width: 250,
    color: "white",
    margin: 10,
  },
  inputPassword: {
    textAlign: "center",
    width: 250,
    color: "white",
    margin: 10,
  },
  connexionButton: {
    borderRadius: 10,
    padding: 9,
    backgroundColor: theme.bgDark(0.6),
  },
  textButton: {
    color: "white",
  },
});
