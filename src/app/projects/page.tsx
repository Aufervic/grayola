// "use client";
import ProjectCard from "@/components/ProjectCard"
import Link from "next/link"
import { FiPlus } from "react-icons/fi";

async function loadProjects() {
    const url = 'https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects?select=*'
    const res = await fetch(url,
        {
            method: "GET",
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
            }
        }
    )
    const data = await res.json()

    // await new Promise((resolve=> setTimeout(resolve, 500)))

    return data
}


export default async function ProjectsPage() {
    // const handleEdit = () => alert("Editar pedido");
    // const handleDelete = () => alert("Eliminar pedido");
    const projects = await loadProjects()
    // console.log(projects)

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-center items-center">
                <h2 className="text-2xl font-semibold text-center mb-4">Proyectos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tarjeta de Nuevo proyecto */}
                <div className="bg-white border border-green-200 rounded-lg shadow-md p-4 max-w-md mx-auto hover:shadow-green-400 hover:border-green-400 transition-all duration-100">
                    {/* Título */}
                    <h3 className="text-lg font-bold text-gray-800 text-center">
                        Crear Nuevo Proyecto
                    </h3>

                    {/* Icono de creación */}
                    <div className="flex justify-center items-center mt-4">
                        <Link
                            href="/projects/new"
                            className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                        >
                            <FiPlus className="w-8 h-8" />
                        </Link>
                    </div>

                    {/* Descripción (opcional) */}
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Haz clic para crear un nuevo proyecto.
                    </p>
                </div>
                {projects?.map((project: any) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project?.title}
                        description={project?.description}
                        attachmentsCount={project.files?.length}
                    // onEdit={handleEdit}
                    // onDelete={handleDelete}
                    />
                ))}

            </div>

        </div>
    )
}