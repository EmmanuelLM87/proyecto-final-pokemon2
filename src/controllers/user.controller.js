const User = require("../models/user.model");
const userCTRL = {};

userCTRL.registrar = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({
      ok: false,
      mensaje: "Este usuario ya existe",
    });
  }

  user = new User({
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    favoritos: req.body.favoritos,
  });

  user.password = await user.encryptPassword(user.password);
  await user.save();
  const token = user.generateKJWT();

  res.status(200).json({
    ok: true,
    mensaje: "Usuario registrado",
    user,
    token,
  });
};

userCTRL.listar = async (req, res) => {
  let users = await User.find({}, { __v: 0 }).populate("favoritos");

  if (!users) {
    res.status(400).json({
      ok: false,
      mensaje: "No hay usuarios",
    });
  } else {
    res.status(200).json({
      ok: true,
      users,
    });
  }
};

// userCTRL.removeFav = async (req, res) => {
//   let id = req.params.id;
//   let data = req.body;

//   await User.findByIdAndUpdate({ _id: id }, { $set: data });
//   let userUp = await User.findById({ _id: id }, { __v: 0 }).populate(
//     "favoritos"
//   );

//   if (!userUp) {
//     return res.status(404).json({
//       ok: false,
//       mensaje: "No ha Usuario",
//     });
//   }

//   res.status(200).json({
//     ok: true,
//     mensaje: " Usuario Actualizado correctamente",
//     userUp,
//   });
// };

// userCTRL.eliminar = async (req, res) => {
//   let id = req.params.id;

//   let user = await User.findOneAndRemove({ _id: id });

//   if (!user) {
//     return res.status(404).json({
//       ok: false,
//       mensaje: "No hay Usuario",
//     });
//   }

//   res.status(200).json({
//     ok: true,
//     mensaje: "Usuario Eliminado",
//   });
// };

userCTRL.login = async (req, res) => {
  const { email, password } = req.body;
  // Comprobamos si el email existe
  const user = await User.findOne({ email: email }, { __v: 0 }).populate(
    "favoritos"
  );
  const validPassword = await user.validatePassword(password); //Comprobamos que la password coincide

  //Si NO se encuentra el usuario
  if (!user)
    return res.status(400).json({
      ok: false,
      mensaje: "Usuario No encontrado",
    });

  //Si la password NO coincide
  if (!validPassword)
    return res.status(400).json({
      ok: false,
      mensaje: "Password Incorrecta",
    });

  const token = user.generateKJWT();
  // Si todo esta bien lo devolvemos
  res.status(200).json({
    ok: true,
    user,
    token,
  });
};

userCTRL.obtener = async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(401).send({ message: "Error en el Servidor" });

  const user = await User.findOne({ _id: id }).populate("favoritos");

  res.status(200).send({ user });
};

userCTRL.favoritos = async (req, res) => {
  let id = req.params.id;

  if (!id) return res.status(401).send({ message: "Error en el Servidor" });

  const user = await User.findOne(
    { _id: id },
    { favoritos: 1, nombre: 1 }
  ).populate("favoritos");

  res.status(200).send({ user });
};

userCTRL.editar = async (req, res) => {
  let id = req.params.id;
  let data = req.body;

  await User.findByIdAndUpdate({ _id: id }, { $set: data });
  let userUp = await User.findById({ _id: id }, { __v: 0 }).populate(
    "favoritos"
  );

  if (!userUp) {
    return res.status(404).json({
      ok: false,
      mensaje: "No ha Usuario",
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: " Usuario Actualizado correctamente",
    userUp,
  });
};

userCTRL.addFavoritos = async (req, res) => {
  const { id } = req.params; // ID del usuario
  const { favoriteId } = req.body; // ID del Pokémon a agregar a favoritos

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Usuario no encontrado" });
    }

    // Verificar si el Pokémon ya está en los favoritos
    if (user.favoritos.includes(favoriteId)) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "El Pokémon ya está en favoritos" });
    }

    user.favoritos.push(favoriteId);
    await user.save();

    // Devolver el usuario actualizado
    res
      .status(200)
      .json({ ok: true, mensaje: "Favorito agregado correctamente", user });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, mensaje: "Error al agregar a favoritos", error });
  }
};

userCTRL.removeFavoritos = async (req, res) => {
  const { id } = req.params; // ID del usuario
  const { favoriteId } = req.body; // ID del Pokémon a eliminar de favoritos

  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ ok: false, mensaje: "Usuario no encontrado" });
    }

    // Verificar si el Pokémon está en los favoritos
    if (!user.favoritos.includes(favoriteId)) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "El Pokémon no está en favoritos" });
    }

    user.favoritos.pull(favoriteId);
    await user.save();

    // Devolver el usuario actualizado
    res
      .status(200)
      .json({ ok: true, mensaje: "Favorito eliminado correctamente", user });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, mensaje: "Error al eliminar de favoritos", error });
  }
};

module.exports = userCTRL;
