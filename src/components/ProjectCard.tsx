"use client";

import { FiPaperclip, FiEdit, FiTrash2, FiEye, FiUserPlus } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/SessionContext";

// Definición de tipos
type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  attachmentsCount: number;
  userRole: string;
};

export default function ProjectCard({
  id,
  title,
  description,
  attachmentsCount,
  userRole,
}: ProjectCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer."
    );
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) {
        console.log("Error eliminando proyecto:", error.message);
        alert("Hubo un error al eliminar el proyecto. Intenta de nuevo.");
        return;
      }

      alert("El proyecto ha sido eliminado exitosamente.");

      router.push("/projects");
    } catch (err) {
      console.log("Error inesperado:", err);
      alert("Ocurrió un error inesperado. Intenta de nuevo.");
    }
  };

  return (
    <div className="bg-white border border-green-200 rounded-lg shadow-md p-4 max-w-md mx-auto hover:shadow-green-400 hover:border-green-400 transition-all duration-100">
      {/* Título */}
      <h3 className="text-lg font-bold text-gray-800">{id + ". " + title}</h3>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mt-2">{description}</p>

      {/* Archivos adjuntos */}
      <div className="flex items-center text-gray-500 mt-4">
        <FiPaperclip className="w-5 h-5 mr-2" />
        <span className="text-sm">({attachmentsCount}) Archivos adjuntos</span>
      </div>

      {/* Acciones */}
      <div className="flex justify-end space-x-4 mt-4">
        {/* Botón Detalle */}
        <Link
          href={`/projects/${id}`}
          className="flex items-center px-3 py-1 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
          title="Ver detalle del proyecto"
        >
          <FiEye className="w-4 h-4 mr-1" />
          Detalle
        </Link>

        {/* Botón Editar */}
        {userRole === "Project Manager" ? (
          <Link
            href={`/projects/edit/${id}`}
            className="flex items-center px-3 py-1 text-sm text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition"
            title="Editar este proyecto"
          >
            <FiEdit className="w-4 h-4 mr-1" />
            Editar
          </Link>
        ) : null}

       

        {/* Botón Asignar Diseñador */}
        {userRole === "Project Manager" ? (
          <Link
            href={`/projects/assign/${id}`}
            className="flex items-center px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            title="Asignar un diseñador a este proyecto"
          >
            <FiUserPlus className="w-4 h-4 mr-1" />
            Asignar
          </Link>
        ) : null}

         {/* Botón Eliminar */}
         {userRole === "Project Manager" ? (
          <button
            onClick={handleDelete}
            className="flex items-center px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
            title="Eliminar este proyecto permanentemente"
          >
            <FiTrash2 className="w-4 h-4 mr-1" />
            Eliminar
          </button>
        ) : null}
      </div>
    </div>
  );
}

