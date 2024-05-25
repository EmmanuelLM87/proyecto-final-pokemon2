const mongoose = require("mongoose");
const { Schema } = mongoose;

const pokemonSchema = new Schema({
  tipo: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  generacion: {
    type: String,
    required: true,
  },
  zona: {
    type: String,
    required: true,
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
