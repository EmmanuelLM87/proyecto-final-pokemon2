import React, { useState, useEffect } from "react";
import { usePoke } from "../context/PokeContext";
import { useAuth } from "../context/AuthContext";
import { addPokemon } from "../api/pokemon";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

function Pokemons() {
  const { pokemon, fetchPokemon, loading } = usePoke();
  const { user, addFavorito, removeFavorito } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleFavorite = async (id) => {
    if (user.favoritos.includes(id)) {
      await removeFavorito(id);
    } else {
      await addFavorito(id);
    }
  };

  const onSubmit = (newPokemon) => {
    try {
      addPokemon(newPokemon);
      setIsModalOpen(false);
      fetchPokemon();
      reset();
    } catch (error) {
      console.error("Error al registrar el Pokémon:", error);
    }
  };

  const handleDetails = (id) => {
    navigate(`/pokemon/${id}`);
  };

  const filteredPokemons = pokemon.filter((poke) =>
    poke.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <button
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setIsModalOpen(true)}
      >
        Registrar Nuevo Pokémon
      </button>
      <input
        type="text"
        placeholder="Buscar Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-zinc-700 text-white px-4 py-2 rounded-md my-4 flex justify-end"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPokemons.map((poke) => (
          <div key={poke._id} className="bg-zinc-700 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold">{poke.nombre}</h2>
            <p className="text-white">Tipo: {poke.tipo}</p>
            <button
              className={`mt-4 px-4 py-2 rounded ${
                user.favoritos.includes(poke._id)
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              } hover:bg-blue-700`}
              onClick={() => handleFavorite(poke._id)}
            >
              {user.favoritos.includes(poke._id)
                ? "Eliminar de Favoritos"
                : "Agregar a Favoritos"}
            </button>

            <button
              className="mt-4 ml-2 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-700"
              onClick={() => handleDetails(poke._id)}
            >
              Ver Detalles
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h2 className="text-2xl mb-4 text-white">
              Registrar Nuevo Pokemon
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-white">Nombre</label>
                <input
                  type="text"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
                />
                {errors.nombre && (
                  <p className="text-red-500">{errors.nombre.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-white">Tipo</label>
                <input
                  type="text"
                  {...register("tipo", { required: "El tipo es obligatorio" })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
                />
                {errors.tipo && (
                  <p className="text-red-500">{errors.tipo.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-white">Generación</label>
                <input
                  type="text"
                  {...register("generacion", {
                    required: "La generación es obligatoria",
                  })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
                />
                {errors.generacion && (
                  <p className="text-red-500">{errors.generacion.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-white">Zona</label>
                <input
                  type="text"
                  {...register("zona", { required: "La zona es obligatoria" })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
                />
                {errors.zona && (
                  <p className="text-red-500">{errors.zona.message}</p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemons;
