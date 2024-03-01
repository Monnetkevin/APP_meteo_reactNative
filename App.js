import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { createContext } from "react";
import HomeScreen from "./screens/HomeScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import { useState } from "react/cjs/react.development";
import DeconnexionScreen from "./screens/DeconnexionScreen";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();
export const GlobalContext = createContext({});

export default function App() {
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <GlobalContext.Provider value={{ token, setToken, isLoaded, setIsLoaded }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              headerShown: false,
            }}
            component={HomeScreen}
          />
          {isLoaded === true ? (
            <Tab.Screen
              name="Profil"
              options={{
                tabBarLabel: "Profil",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="lock-open"
                    color={color}
                    size={size}
                  />
                ),
                headerShown: false,
              }}
              component={DeconnexionScreen}
            />
          ) : (
            <Tab.Screen
              name="Connexion"
              options={{
                tabBarLabel: "Connexion",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account"
                    color={color}
                    size={size}
                  />
                ),
                headerShown: false,
              }}
              component={ConnexionScreen}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
