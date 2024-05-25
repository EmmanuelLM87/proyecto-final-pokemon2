import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/pokemons");
  }, [isAuth]);
  return (
    <div className=" flex h-screen items-center justify-center">
      <div className=" bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className=" text-2xl font-bold my-2">Registro</h1>
        <form
          onSubmit={handleSubmit(async (values) => {
            signUp(values);
          })}
        >
          <label className="text-xs block my-1 text-slate-300" htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            {...register("nombre", { required: "El Nombre es obligatorio" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
          />
          {errors.nombre && (
            <p className="text-red-500">{errors.nombre.message}</p>
          )}

          <label className="text-xs block my-1 text-slate-300" htmlFor="emai">
            Email:
          </label>
          <input
            type="email"
            {...register("email", { required: "El Email es obligatorio" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label
            className="text-xs block my-1 text-slate-300"
            htmlFor="password"
          >
            Contraseña:
          </label>
          <input
            type="password"
            {...register("password", {
              required: "La Contraseña es obligatoria",
            })}
            s
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-4"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button type="submit">Registrtar</button>
        </form>

        <p className="flex gap-x-2 justify-between  my-5">
          Si ya tienes una cuenta ve a{" "}
          <Link to="/login" className=" text-sky-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
