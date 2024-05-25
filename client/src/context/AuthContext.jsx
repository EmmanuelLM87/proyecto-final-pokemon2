import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { registerRequest, loginRequest } from "../api/auth";
import { addFav, delFav } from "../api/pokemon";

// Crear el contexto
const AuthContext = createContext();

// Hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No hay provider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const cleanToken = (token) => token.replace(/(^"|"$)/g, ""); // Elimina comillas al inicio y al final

  const API = "http://localhost:3000/api";

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addFavorito = async (pokemonId) => {
    try {
      const response = await addFav(pokemonId, user._id);
      // const response = await axios.post(`${API}/users/${user._id}/favoritos`, {
      //   favoriteId: pokemonId,
      // });
      updateUser(response.data.user);
    } catch (error) {
      console.error("Error al agregar favorito:", error);
    }
  };

  const removeFavorito = async (pokemonId) => {
    try {
      // const response = await delFav(pokemonId, user._id);
      const response = await axios.delete(
        `${API}/users/${user._id}/favoritos`,
        { data: { favoriteId: pokemonId } }
      );
      updateUser(response.data.user);
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  const [favoritos, setFavoritos] = useState([]);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  const signUp = async (user) => {
    user.favoritos = [];
    try {
      const res = await registerRequest(user);
      const token = cleanToken(res.data.token);
      saveToLocalStorage("user", res.data.user);
      saveToLocalStorage("token", token);
      setUser(res.data.user);
      setToken(token);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      const token = cleanToken(res.data.token);
      saveToLocalStorage("user", res.data.user);
      saveToLocalStorage("token", token);
      setUser(res.data.user);
      setToken(token);
      setFavoritos(res.data.user.favoritos);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    removeFromLocalStorage("user");
    removeFromLocalStorage("token");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        user,
        token,
        isAuth,
        addFavorito,
        removeFavorito,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
