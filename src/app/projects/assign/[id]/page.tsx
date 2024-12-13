"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/utils/SessionContext";

export default function AssignDesigner() {
  const router = useRouter();
  const { id } = useParams();
  const [project, setProject] = useState({
    id:"",
    title:"",
    description:"",
    files: []
  });
  const [designers, setDesigners] = useState([{id:"", first_name:"", user_id:""}]);
  const [selectedDesigner, setSelectedDesigner] = useState("");

  console.log("id", id)

  useEffect(() => {
    // Fetch project details
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, description, files, designer_id")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching project:", error.message);
        alert("Error cargando los datos del proyecto.");
        return;
      }
      setProject(data);
      setSelectedDesigner(data.designer_id || "");
    };

    // Fetch designers
    const fetchDesigners = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, user_id")
        .eq("role", "Designer");

      if (error) {
        console.error("Error fetching designers:", error.message);
        alert("Error cargando la lista de diseñadores.");
        return;
      }
      setDesigners(data);
    };

    fetchProject();
    fetchDesigners();
  }, [id]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log("1")
    const { error } = await supabase
      .from("projects")
      .update({ designer_id: selectedDesigner })
      .eq("id", id);
    console.log("2")

    if (error) {
      console.error("Error updating designer:", error.message);
      alert("Error asignando el diseñador.");
      return;
    }

    alert("Diseñador asignado exitosamente.");
    router.push(`/projects/${id}`);
  };

  if (!project) {
    return <p>Cargando detalles del proyecto...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Asignar Diseñador</h1>

      {/* Detalles del proyecto */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold">{project.id +". "+ project.title}</h2>
        <p className="text-gray-600">{project.description}</p>

        <h3 className="text-lg font-semibold mt-4">Archivos:</h3>
        <ul className="list-disc list-inside">
          {project.files?.map((file, index) => (
            <li key={index}>
              <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario para asignar diseñador */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <label htmlFor="designer" className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Diseñador
        </label>
        <select
          id="designer"
          value={selectedDesigner}
          onChange={(e) => setSelectedDesigner(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">-- Seleccionar --</option>
          {designers.map((designer) => (
            <option key={designer.id} value={designer.user_id}>
              {designer.first_name}
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
  );
}