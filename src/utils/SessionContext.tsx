"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient, Session } from "@supabase/supabase-js";
import { Profile, SessionContextType } from "./inerfaces";

export const supabase = createClient(
  "https://efoeppbhiedlznwxecaa.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8"
);


const SessionContext = createContext<SessionContextType >({});

export const useSessionContext = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);  // Estado para almacenar el perfil
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // Obtener el perfil del usuario desde la base de datos de Supabase (puedes ajustar la tabla y campos según tu configuración)
        const { data, error } = await supabase.from('profiles').select('*').eq('user_id', session.user.id).single();
        if (error) {
          console.log("Error al obtener el perfil", error.message);
        } else {
          setProfile(data);  // Almacenar los datos del perfil
        }
      }

      // Escuchar cambios en la sesión (login/logout)
      supabase.auth.onAuthStateChange(async(event, session) => {
        console.log("Hubo un cambio en la sesion")
        console.log("Current session", session)
        setSession(session);
        if (session) {
          // Obtener perfil de nuevo después de cada cambio de sesión
          const { data, error } = await supabase.from('profiles').select('*').eq('user_id', session.user.id).single();
          if (error) {
            console.log("Error al obtener el perfil", error.message);
          } else {
            setProfile(data);  // Almacenar los datos del perfil
          }
        } else {
          setProfile(null);  // Limpiar los datos del perfil cuando se cierra sesión
        }
      });

      setIsLoading(false);
    };

    fetchSessionAndProfile();
  }, []);

  // Mientras se está cargando la sesión o perfil, no renderizamos nada
  if (isLoading) {
    return null;  // Aquí podrías poner un spinner o algo para mostrar que la app está cargando
  }

  return (
    <SessionContext.Provider value={{ session, profile }}>
      {children}
    </SessionContext.Provider>
  );
};