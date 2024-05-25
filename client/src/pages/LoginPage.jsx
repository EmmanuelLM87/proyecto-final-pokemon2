import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isAuth } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuth) navigate("/pokemons");
  }, [isAuth]);

  return (
    <div className=" flex h-screen items-center justify-center">
      <div className=" bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className=" text-2xl font-bold">Login</h1>

        <form onSubmit={onSubmit}>
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

          <button type="submit">Login</button>
        </form>

        <p className="flex gap-x-2 justify-between  my-5">
          Si no tienes una cuenta ve a{" "}
          <Link to="/register" className=" text-sky-500">
            Registro
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
