import React, { useEffect, useState } from "react";

import Header from "../components/Pokemon/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Pokemon } from "../models/pokemon";
import { ScrollView } from "react-native";
import Stats from "../components/Pokemon/Stats";
import Type from "../components/Pokemon/Type";
import { getPokemonDetailsApi } from "../api/pokemon";

export interface PokemonScreenProps {
  navigation: {
    goBack: () => void;
    setOptions: ({
      headerRight,
      headerLeft,
    }: {
      headerRight: () => void;
      headerLeft: () => void;
    }) => void;
  };
  route: { params: { id: string } };
}

const PokemonScreen = ({
  navigation,
  route: { params },
}: PokemonScreenProps) => {
  const [pokemon, setPokemon] = useState<Pokemon | any | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          size={20}
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  const loadPokemonDetails = () => {};

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other["official-artwork"].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
};

export default PokemonScreen;
