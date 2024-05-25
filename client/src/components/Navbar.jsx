import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { signOut } = useAuth();
  return (
    <nav className=" bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg ">
      <h1 className=" text-2xl font-bold">Pokedex</h1>
      <ul className=" flex gap-x-3">
        <li>
          <Link to="/user">Detalle de usuario</Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => {
              signOut();
            }}
          >
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
