const Pokemon = require("../models/pokemon.model");
PokemonCTRL = {};

PokemonCTRL.listar = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({}, { __v: 0 });
    res.status(200).json(pokemons);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

PokemonCTRL.registrar = async (req, res) => {
  try {
    const { tipo, nombre, generacion, zona } = req.body;
    const nuevoPokemon = new Pokemon({
      tipo,
      nombre,
      generacion,
      zona,
    });
    await nuevoPokemon.save();
    res.status(200).json(nuevoPokemon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

PokemonCTRL.obtener = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id, { __v: 0 });
    if (!pokemon)
      return res.status(404).json({ message: "Pokemon no encontado" });
    return res.status(200).json(pokemon);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = PokemonCTRL;
