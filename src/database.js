const mongoose = require("mongoose");
const URI = "mongodb://localhost/pokemon";

mongoose
  .connect(URI)
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => console.log(err));
