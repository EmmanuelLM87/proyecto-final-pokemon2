const express = require("express");
const router = express.Router();
const pokemon = require("../controllers/pokemon.controller");
const user = require("../controllers/user.controller");

const verifyToken = require("../middlewares/verifyToken");
// Rutas Pokemon
router.post("/pokemon/registrar", verifyToken.auth, pokemon.registrar);
router.get("/pokemon", verifyToken.auth, pokemon.listar);
router.get("/pokemon/:id", pokemon.obtener);

//Rutas Usuarios
router.post("/usuarios/registrar", user.registrar);
router.get("/usuarios/", user.listar);
router.get("/usuarios/:id", user.obtener);
router.get("/favoritos/:id", user.favoritos);
router.patch("/usuarios/editar/:id", verifyToken.auth, user.editar);
router.post("/users/:id/favoritos", verifyToken.auth, user.addFavoritos);
router.delete("/users/:id/favoritos", user.removeFavoritos);
router.post("/login", user.login);

module.exports = router;
