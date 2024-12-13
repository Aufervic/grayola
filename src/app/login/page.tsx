"use client";

import { useState } from "react";
import { supabase } from "@/utils/SessionContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensajes de error

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensajes previos

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage("Error al iniciar sesión: " + error.message);
      } else {
        // Redirigir al usuario tras login exitoso
        // Redirigir al usuario a la página /projects
        setTimeout(() => {
          router.push("/projects");
        }, 3000)
      }
    } catch (err) {
      setErrorMessage("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-500 via-teal-400 to-cyan-500 flex flex-col justify-center items-center relative">

      <div className="max-w-md mx-auto p-6 bg-green-50 shadow-lg rounded-md border border-green-300">
        <h1 className="text-2xl font-bold text-green-700 text-center mb-4">Iniciar Sesión</h1>
        {errorMessage && (
          <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-green-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-200 text-gray-800"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-green-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-200 text-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
