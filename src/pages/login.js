import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user")
    if(!user){
      alert("Nenhum usuário cadastro")
      return
    }
    const userJson = JSON.parse(user)
    if(userJson.email === email && userJson.password === password){
      navigation.navigate("main")
    }else{
      alert("E-mail ou senha inválidos!")
    }
  };

  const handleCadastro = () => {
    navigation.navigate('cadastro')
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("./public/icon.png")}
        style={styles.icon}
      />
      <View style={{ height: 10 }} />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCadastro} onPress={handleCadastro}>
        <Text style={styles.buttonCadastroText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  icon: {
    width: 140,
    height: 140,
    marginBottom: 0,
    marginTop: -30,
  },
  button: {
    backgroundColor: "#101f5fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonCadastro: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#101f5fff",
  },
  buttonCadastroText: {
    color: "#101f5fff",
    fontWeight: "bold",
  },
});

export default Login;