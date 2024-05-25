import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function PokemonDetalle() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/pokemon/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del Pokémon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Pokémon</h1>
      {pokemon ? (
        <div className=" bg-pink-700 shadow-md rounded-lg p-4  max-w-60">
          <h2 className="text-xl font-bold mb-2">{pokemon.nombre}</h2>
          <p className=" text-white">Tipo: {pokemon.tipo}</p>
          <p className=" text-white">Generación: {pokemon.generacion}</p>
          <p className=" text-white">Zona: {pokemon.zona}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/pokemons")}
          >
            Volver al listado
          </button>
        </div>
      ) : (
        <p>Error al cargar los detalles del Pokémon</p>
      )}
    </div>
  );
}

export default PokemonDetalle;
