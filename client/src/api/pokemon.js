import axios from "axios";

const API = "http://localhost:3000/api";

const cleanToken = (token) => token.replace(/(^"|"$)/g, "");

export const getPokemonRequest = () => {
  let token = localStorage.getItem("token");
  token = cleanToken(token);
  const formattedToken = `Bearer ${token}`;
  return axios.get(`${API}/pokemon`, {
    headers: {
      Authorization: formattedToken, // Añadir 'Bearer' al token
    },
  });
};

export const addPokemon = (newPokemon) => {
  let token = localStorage.getItem("token");
  token = cleanToken(token);
  const formattedToken = `Bearer ${token}`;
  axios.post(`${API}/pokemon/registrar`, newPokemon, {
    headers: { Authorization: formattedToken },
  });
};

export const addFav = (pokemonId, userID) => {
  let token = localStorage.getItem("token");
  token = cleanToken(token);
  const formattedToken = `Bearer ${token}`;
  return axios.post(
    `${API}/users/${userID}/favoritos`,
    {
      favoriteId: pokemonId,
    },
    {
      headers: {
        Authorization: formattedToken, // Añadir 'Bearer' al token
      },
    }
  );
};

export const delFav = (pokemonId, userID) => {
  let token = localStorage.getItem("token");
  token = cleanToken(token);
  const formattedToken = `Bearer ${token}`;
  return axios.delete(
    `${API}/users/${userID}/favoritos`,
    { data: { favoriteId: pokemonId } },
    {
      headers: {
        Authorization: formattedToken, // Añadir 'Bearer' al token
      },
    }
  );
};
