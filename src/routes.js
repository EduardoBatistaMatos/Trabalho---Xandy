import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./pages/main";
import Login from "./pages/login";
import User from "./pages/user";
import Cadastro from "./pages/cadastro"

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: "LOGIN",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#101f5fff",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
            headerTintColor: "#fff", // cor do botão de voltar
          }}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{
            title: "Rocket Viewer",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#101f5fff",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="user"
          component={User}
          options={{
            title: "Perfil do Usuário",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#101f5fff",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="cadastro"
          component={Cadastro}
          options={{
            title: "Cadastro de Usuários",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#101f5fff",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}