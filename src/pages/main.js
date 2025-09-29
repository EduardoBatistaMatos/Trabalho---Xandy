import React, { Component } from "react";
import { Keyboard, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "../styles";

export default class Main extends Component {
  state = {
    newRocket: "",
    rockets: [],
    loading: false,
  };

  async componentDidMount() {
    try {
      const rockets = await AsyncStorage.getItem("rockets");
      if (rockets) {
        this.setState({ rockets: JSON.parse(rockets) });
      }
    } catch (error) {
      console.log("Erro ao carregar foguetes:", error);
    }
  }

  componentDidUpdate(_, prevState) {
    const { rockets } = this.state;
    if (prevState.rockets !== rockets) {
      AsyncStorage.setItem("rockets", JSON.stringify(rockets));
    }
  }

  handleAddRocket = async () => {
    const { rockets, newRocket } = this.state;
    
    if (!newRocket.trim()) {
      alert("Digite o nome de um foguete!");
      return;
    }

    this.setState({ loading: true });
    
    try {
      console.log("Buscando foguete:", newRocket);
      
      const response = await api.get('/rockets');
      console.log("Foguetes encontrados:", response.data.length);
      
      const rocketData = response.data.find(rocket => {
        const searchTerm = newRocket.toLowerCase().trim();
        return rocket.name.toLowerCase().includes(searchTerm) ||
               rocket.id.toLowerCase().includes(searchTerm);
      });
      
      console.log("Foguete encontrado:", rocketData);
      
      if (!rocketData) {
        alert(`Foguete "${newRocket}" não encontrado!\n\nTente: falcon, starship, heavy`);
        this.setState({ loading: false });
        return;
      }

      if (rockets.find((rocket) => rocket.id === rocketData.id)) {
        alert("Foguete já adicionado!");
        this.setState({ loading: false });
        return;
      }

      const data = {
        id: rocketData.id,
        name: rocketData.name,
        description: rocketData.description,
        image: rocketData.flickr_images && rocketData.flickr_images[0] ? rocketData.flickr_images[0] : null,
        type: rocketData.type,
        active: rocketData.active,
        cost_per_launch: rocketData.cost_per_launch,
        success_rate_pct: rocketData.success_rate_pct,
        first_flight: rocketData.first_flight,
        height: rocketData.height,
        diameter: rocketData.diameter,
        mass: rocketData.mass,
      };

      console.log("Adicionando foguete:", data);
      
      this.setState({
        rockets: [...rockets, data],
        newRocket: "",
        loading: false,
      });
      
      Keyboard.dismiss();
      alert(`Foguete "${rocketData.name}" adicionado com sucesso!`);
      
    } catch (error) {
      console.log("Erro ao buscar foguete:", error);
      alert("Erro ao conectar com a API da SpaceX. Verifique sua conexão.");
      this.setState({ loading: false });
    }
  };

  render() {
    const { rockets, newRocket, loading } = this.state;
    console.log("Renderizando com foguetes:", rockets.length);
    
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar foguete (ex: falcon, starship)"
            value={newRocket}
            onChangeText={(text) => this.setState({ newRocket: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddRocket}
          />
          <SubmitButton loading={loading} onPress={this.handleAddRocket}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="search" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        
        {rockets.length > 0 ? (
          rockets.map((rocket) => (
            <User key={rocket.id}>
              {rocket.image && <Avatar source={{ uri: rocket.image }} />}
              <Name>{rocket.name}</Name>
              <Bio>{rocket.description}</Bio>
              <ProfileButton
                onPress={() => {
                  this.props.navigation.navigate("user", { rocket: rocket });
                }}
              >
                <ProfileButtonText>Ver detalhes</ProfileButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {
                  this.setState({
                    rockets: rockets.filter((r) => r.id !== rocket.id),
                  });
                }}
                style={{ backgroundColor: "#c73a51ff" }}
              >
                <ProfileButtonText>Remover</ProfileButtonText>
              </ProfileButton>
            </User>
          ))
        ) : (
          <User>
            <Name>Nenhum foguete adicionado ainda</Name>
            <Bio>Digite "falcon" ou "starship" para buscar foguetes da SpaceX</Bio>
          </User>
        )}
      </Container>
    );
  }
}