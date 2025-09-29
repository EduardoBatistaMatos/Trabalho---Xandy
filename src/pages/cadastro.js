import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default class Cadastro extends Component {
  state = {
    nome: "",
    telefone: "",
    cpf: "",
    curso: "",
    email: "",
    password: "",
  };

  handleCadastro = async () => {
    const { nome, telefone, cpf, curso, email, password } = this.state;
    if (!nome || !telefone || !cpf || !curso || !email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    const user = {
      nome,
      telefone,
      cpf,
      curso,
      email,
      password,
    };

    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Usuário cadastrado com sucesso!");
    this.props.navigation.navigate("login");
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={this.state.nome}
          onChangeText={(nome) => this.setState({ nome })}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={this.state.telefone}
          onChangeText={(telefone) => this.setState({ telefone })}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={this.state.cpf}
          onChangeText={(cpf) => this.setState({ cpf })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={this.state.curso}
          onChangeText={(curso) => this.setState({ curso })}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  button: {
    backgroundColor: "#101f5fff",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});