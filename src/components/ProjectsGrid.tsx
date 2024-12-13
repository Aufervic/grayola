"use client";
import ProjectCard from "@/components/ProjectCard"
import Link from "next/link"
import { FiPlus } from "react-icons/fi";
import { useSessionContext } from "@/utils/SessionContext";
import { useEffect, useState } from "react";

interface Project {
    id: string;
    title: string;
    description: string;
    file: string[]
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    const { session, profile } = useSessionContext();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Cambia el estado después del montaje en el cliente
    }, []);

    if (!isClient) {
        return (
            <div className="p-6 bg-gradient-to-br from-yellow-100 via-green-100 to-cyan-100 min-h-screen">

                <div className="text-center">Cargando...</div>
            </div>
        )
    }

    if (!session) {
        return <p>No estás autenticado. Por favor, inicia sesión.</p>;
    }
    return (
        <div className="p-6 bg-gradient-to-br from-yellow-100 via-green-100 to-cyan-100 min-h-screen">
            <div className="flex justify-center items-center mb-6">
                <h2 className="text-3xl font-extrabold text-center text-gray-800">Proyectos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile?.role === "Client" ? (
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
                ) : (
                    <></>
                )}

                {projects?.map((project: any) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project?.title}
                        description={project?.description}
                        attachmentsCount={project.files?project.files?.length:0}
                        userRole={profile ? profile.role : "Client"}
                    // onEdit={handleEdit}
                    // onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>

    )
}