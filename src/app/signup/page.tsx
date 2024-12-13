"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/utils/SessionContext";
// const supabase = createClient("https://efoeppbhiedlznwxecaa.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8");


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Client"); // Valor predeterminado
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter()

  const handleSignUp = async () => {
    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setMessage("");

    console.log(email, password)
    try {
      // Registro del usuario con correo y contraseña
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      const userId = authData.user?.id;
      console.log(authData.user?.id)

      if (userId) {
        const { error: profileError } = await supabase.from("profiles").insert({
          password,
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          user_id: userId,
        });

        if (profileError) {
          throw new Error(profileError.message);
        }
      }


      // Iniciar sesión automáticamente después del registro
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw new Error(signInError.message);
      }

      // Redirigir al usuario a la página /projects
      router.push("/projects");

      setMessage("¡Registro exitoso! Por favor, verifica tu correo electrónico.");

    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-500 via-teal-400 to-cyan-500 flex flex-col justify-center items-center relative">
      <div className="max-w-md mx-auto p-6 bg-green-50 shadow-lg rounded-md border border-green-300 mt-6">
        <h1 className="text-2xl font-bold mb-6 text-green-700 text-center">Registro de Usuario</h1>

        {message && <p className="mb-4 text-sm text-center text-red-800 font-semibold">{message}</p>}

        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-200 text-gray-800"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-200 text-gray-800"
        />

        <input
          type="text"
          placeholder="Nombres"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-200 text-gray-800"
        />

        <input
          type="text"
          placeholder="Apellidos"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-200 text-gray-800"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-4 border border-green-300 rounded-md focus:outline-none focus:ring focus:ring-green-200 text-gray-800"
        >
          <option value="Client">Cliente</option>
          <option value="Project Manager">Project Manager</option>
          <option value="Designer">Diseñador</option>
        </select>

        <button
          onClick={handleSignUp}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </div>
    </div>

  );
}
