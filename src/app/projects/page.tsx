"use client";  // Indicar que este componente es del lado del cliente
import { useSessionContext } from "@/utils/SessionContext";
import { useRouter } from "next/navigation";
import ProjectsGrid from "@/components/ProjectsGrid";
import { useEffect, useState } from "react";


// Función para cargar proyectos desde la API de Supabase
async function loadProjects(userRole: string, userID: string) {
  // si soy Cliente debo ver los proyectos que creé
  if (userRole === "Client") {
    const url = `https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects?user_id=eq.${userID}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',  // Reemplaza con tu API key de Supabase
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',  // Reemplaza con tu token de autorización
      },
    });
    const data = await res.json();
    return data;
  }

  // si soy diseñador debo ver los proyetos que se me asignaron
  if (userRole === "Designer") {
    const url = `https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects?designer_id=eq.${userID}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',  // Reemplaza con tu API key de Supabase
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',  // Reemplaza con tu token de autorización
      },
    });
    const data = await res.json();
    return data;
  }

  // Si soy Project manager debo  todos los proyectos
  if (userRole === "Project Manager") {
    const url = 'https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects?select=*';
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',  // Reemplaza con tu API key de Supabase
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',  // Reemplaza con tu token de autorización
      },
    });
    const data = await res.json();
    return data;
  }

  return []
}


// Componente principal de ProjectsPage
export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);  // Estado de carga para la verificación de sesión
  const session = useSessionContext();  // Obtiene la sesión del contexto
  const router = useRouter();

  useEffect(() => {
    if (session === null || session.session === null) {
      // Si no hay sesión, redirigir al login
      router.push("/login");
    } else {
      // Si hay sesión, cargar proyectos
      // console.log(session)
      loadProjects(session.profile?.role, session.profile?.user_id).then((data) => {
        setProjects(data);
        setLoading(false);  // Marca que la carga de proyectos ha finalizado
      });
    }
  }, [session, router]);

  if (loading) {
    return <p>Cargando...</p>;  // Puedes mostrar un spinner o mensaje mientras se cargan los proyectos
  }

  return <ProjectsGrid projects={projects} />;  // Muestra los proyectos si la sesión es válida
}
