const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index.routes");
//CORS
app.use(cors());

//Database
require("./database");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Settings
app.set("port", process.env.PORT || 3000);

//Importar y usar Ruras

app.use("/api", routes);

//Lanzar Servidor
function Init() {
  app.listen(app.get("port"));
  console.log("Servidor en puerto", app.get("port"));
}

Init();
