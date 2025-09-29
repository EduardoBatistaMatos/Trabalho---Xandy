import React, { Component } from "react";
import {
  Container,
  Header,
  AvatarPerfil,
  NamePerfil,
  BioPerfil,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from "../styles.js";

export default class User extends Component {
  state = {
    launches: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { rocket } = route.params;

    try {
      // Buscar lançamentos relacionados ao foguete
      const response = await fetch(`https://api.spacexdata.com/v5/launches`);
      const allLaunches = await response.json();
      const rocketLaunches = allLaunches.filter(launch => 
        launch.rocket === rocket.id
      ).slice(0, 10); // Limitar a 10 lançamentos
      
      this.setState({ launches: rocketLaunches });
    } catch (error) {
      console.log("Erro ao buscar lançamentos:", error);
    }
  }

  render() {
    const { route } = this.props;
    const { rocket } = route.params;
    const { launches } = this.state;

    return (
      <Container>
        <Header>
          {rocket.image && <AvatarPerfil source={{ uri: rocket.image }} />}
          <NamePerfil>{rocket.name}</NamePerfil>
          <BioPerfil>{rocket.description}</BioPerfil>
          <BioPerfil>Tipo: {rocket.type}</BioPerfil>
          <BioPerfil>Status: {rocket.active ? 'Ativo' : 'Inativo'}</BioPerfil>
          {rocket.cost_per_launch && (
            <BioPerfil>Custo por lançamento: ${rocket.cost_per_launch.toLocaleString()}</BioPerfil>
          )}
          {rocket.success_rate_pct && (
            <BioPerfil>Taxa de sucesso: {rocket.success_rate_pct}%</BioPerfil>
          )}
          {rocket.first_flight && (
            <BioPerfil>Primeiro voo: {rocket.first_flight}</BioPerfil>
          )}
        </Header>

        <Stars
          data={launches}
          keyExtractor={(launch) => String(launch.id)}
          renderItem={({ item }) => (
            <Starred>
              <Info>
                <Title>{item.name || 'Lançamento sem nome'}</Title>
                <Author>Data: {item.date_local || 'Data não disponível'}</Author>
                <Author>Status: {item.success ? 'Sucesso' : 'Falha'}</Author>
                {item.details && <Author>Detalhes: {item.details}</Author>}
              </Info>
            </Starred>
          )}
        />
      </Container>  
    );
  }
}