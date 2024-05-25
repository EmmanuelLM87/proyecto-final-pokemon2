import React, { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/favoritos/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los favoritos del usuario:", error);
        setLoading(false);
      }
    };

    fetchUserFavorites();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{user.nombre}</h1>
          <h2 className="text-xl font-bold mb-4">Favoritos:</h2>
          {user.favoritos.length > 0 ? (
            <ul className="list-disc list-inside">
              {user.favoritos.map((fav) => (
                <li key={fav._id} className="text-white">
                  {fav.nombre}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes favoritos</p>
          )}
        </>
      ) : (
        <p>Error al cargar los datos del usuario</p>
      )}
    </div>
  );
}

export default User;
