import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Pokemons from "./pages/Pokemons";
import Favoritos from "./pages/Favoritos";
import { AuthProvider } from "./context/AuthContext";
import { PokeProvider } from "./context/PokeContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import User from "./pages/User";
import PokemonDetalle from "./pages/PokemonDetalle";

function App() {
  return (
    <AuthProvider>
      <PokeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Pokemons />} />
              <Route path="/pokemons" element={<Pokemons />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/user" element={<User />} />
              <Route path="/pokemon/:id" element={<PokemonDetalle />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PokeProvider>
    </AuthProvider>
  );
}

export default App;
