"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/utils/SessionContext";


async function loadProject(id: string) {
  console.log("Pidiendo proyectos")
  const url = `https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects?id=eq.${id}`
  const res = await fetch(url,
    {
      method: "GET",
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
      }
    }
  )

  if (!res.ok) {
    throw new Error(`No se pudo cargar el proyecto con ID ${id}`);
  }

  const data = await res.json()
  return data[0]
}

async function loadDesigners() {
  const url = `https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/profiles?role=eq.Designer`
  const res = await fetch(url,
    {
      method: "GET",
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
      }
    }
  )

  if (!res.ok) {
    throw new Error(`No se pudieron cargar los diseñadores`);
  }

  const data = await res.json()
  return data
}


async function loadProject2(id: string) {
  console.log("ho 1")
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, files, designer_id")
    .eq("id", id)
    .single();
  console.log("ho 2")

  if (error) {
    console.log("Error fetching project:", error.message);
    alert("Error cargando los datos del proyecto.");
    return;
  }

  return data
}


async function loadDesigners2() {
  console.log("hla 1")
  const { data, error } = await supabase
    .from("profiles")
    .select("id, first_name, user_id")
    .eq("role", "Designer");

  console.log("hla 2")
  if (error) {
    console.log("Error fetching designers:", error.message);
    alert("Error cargando la lista de diseñadores.");
    return;
  }

  return data
}


export default function AssignDesigner() {
  const router = useRouter();
  const { id } = useParams();
  const [project, setProject] = useState<any>(null)
  const [designers, setDesigners] = useState<any>([])
  const [selectedDesigner, setSelectedDesigner] = useState("");



  useEffect(() => {
    if (!id) return;

    loadProject(id + "").then((data) => {
      setProject(data);
      setSelectedDesigner(data?.designer_id || "");
    })

    loadDesigners().then((data) => {
      setDesigners(data);
    })
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("1")
    const { error } = await supabase
      .from("projects")
      .update({ designer_id: selectedDesigner })
      .eq("id", id);
    console.log("2")

    if (error) {
      console.log("Error updating designer:", error.message);
      alert("Error asignando el diseñador.");
      return;
    }

    alert("Diseñador asignado exitosamente.");
    router.push(`/projects/${id}`);
  };

  if (!project) {
    return (
      <div className='p-6 bg-gradient-to-br from-green-100 via-cyan-200 to-green-100 min-h-screen'>
        <p className="text-center">Cargando detalles del proyecto...</p>
      </div>
    )
  }

  return (
    <div className='p-6 bg-gradient-to-br from-green-100 via-cyan-200 to-green-100 min-h-screen'>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-green-100">
        <h1 className="text-2xl font-bold mb-4">Asignar Diseñador</h1>
        {/* Detalles del proyecto */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-700">{project.id + ". " + project.title}</h2>
          <p className="text-gray-600">{project.description}</p>

          <h3 className="text-lg font-semibold text-gray-700 mt-4">Archivos:</h3>
          <ul className="list-disc list-inside">
            {project.files?.map((file: any, index: any) => (
              <li key={index}>
                <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Ver archivo {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulario para asignar diseñador */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
          <label htmlFor="designer" className="block  text-lg font-semibold text-gray-700 mb-2">
            Seleccionar Diseñador
          </label>
          <select
            id="designer"
            value={selectedDesigner}
            onChange={(e) => setSelectedDesigner(e.target.value)}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">-- Seleccionar --</option>
            {designers?.map((designer: any) => (
              <option key={designer?.id} value={designer?.user_id}>
                {designer?.first_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Asignar Diseñador
          </button>
        </form>
      </div>
    </div>
  );
}