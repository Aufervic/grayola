// "use client";
import { FiEdit, FiTrash } from 'react-icons/fi';


async function loadProject(id: string) {
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

export default async function ProjectDetail({params,}: {params: { id: string };}) {
    const resolvedParams = await Promise.resolve(params);
    const project = await loadProject(resolvedParams.id)

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto mt-8">
            {/* Título y descripción del proyecto */}
            <div className="mb-4">
                <h2 className="text-3xl font-semibold text-gray-800">{project.id+". "+project.title}</h2>
                <p className="text-lg text-gray-600 mt-2">{project.description}</p>
            </div>

            {/* Sección de archivos adjuntos */}
            <div className="mb-6">
                <h3 className="text-2xl font-medium text-gray-800">Archivos del Proyecto</h3>
                <ul className="mt-2 space-y-2">
                    {project.files?.length > 0 ? (
                        project.files.map((file: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                                {/* Icono de archivo */}
                                <FiEdit className="text-gray-500" />
                                <a href={file} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                    Ver archivo {index + 1}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No hay archivos adjuntos.</li>
                    )}
                </ul>
            </div>

            {/* Botones de acción: Editar y Eliminar */}
            <div className="flex justify-end space-x-4">
                <button
                    // onClick={() => alert("Editar")}
                    className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4 flex items-center space-x-2"
                >
                    <FiEdit className="w-5 h-5" />
                    <span>Editar</span>
                </button>
                <button
                    // onClick={() => alert("Eliminar")}
                    className="text-white bg-red-500 hover:bg-red-600 rounded-lg py-2 px-4 flex items-center space-x-2"
                >
                    <FiTrash className="w-5 h-5" />
                    <span>Eliminar</span>
                </button>
            </div>
        </div>
    )
}