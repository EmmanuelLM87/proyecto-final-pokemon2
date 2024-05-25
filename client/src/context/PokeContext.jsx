import React, { createContext, useContext, useState, useCallback } from "react";
import { getPokemonRequest } from "../api/pokemon"; // Ajusta la ruta según sea necesario

const PokeContext = createContext();

export const usePoke = () => {
  const context = useContext(PokeContext);
  if (!context) {
    throw new Error("No hay provider");
  }
  return context;
};

export const PokeProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemon = useCallback(async () => {
    try {
      const response = await getPokemonRequest();
      setPokemon(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setLoading(false);
    }
  }, []); // useCallback asegura que la función no cambie

  return (
    <PokeContext.Provider value={{ pokemon, fetchPokemon, loading }}>
      {children}
    </PokeContext.Provider>
  );
};
