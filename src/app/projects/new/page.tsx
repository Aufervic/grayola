"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, useSessionContext } from "@/utils/SessionContext";

export default function NewProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false); // Estado de carga

    const session = useSessionContext();
    const router = useRouter()


    useEffect(() => {
        if (session === null || session.session === null) {
          // Si no hay sesión, redirigir al login
          router.push("/login");
        } else {
          // Si hay sesión
        }
      }, [session, router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Empezar a crear")
        setLoading(true); // Inicia la carga
        

        // Subir archivos a Supabase Storage
        const fileUrls: string[] = []; // Para almacenar las URLs de los archivos subidos
        for (const file of files) {
            const timestamp = Date.now(); // O puedes usar una librería para generar un UUID.
            const uniqueFileName = `${timestamp}-${file.name}`;

            console.log("1")
            const { data, error } = await supabase.storage
                .from('projects') // El nombre de tu contenedor en Supabase
                .upload(`public/${uniqueFileName}`, file, { upsert: false });

            if (error) {
                console.log("Error al subir el archivo:", error);
                setLoading(false);
                return;
            }
            console.log("2")
            // Obtener la URL pública del archivo subido
            const { data: publicData } = supabase.storage
                .from('projects')
                .getPublicUrl(data.path);

                if (!publicData) {
                    console.log("Error al obtener la URL del archivo");
                    setLoading(false);
                    return;
                }

            // Guardar la URL en el array de URLs
            fileUrls.push(publicData.publicUrl); // Usamos 'publicUrl' correctamente
        }

        // Crear el proyecto con las URLs de los archivos
        const requestBody = {
            title,
            description,
            files: fileUrls, // Agregar las URLs de los archivos al campo 'files'
            user_id: session?.profile?.user_id
        };

        console.log(JSON.stringify(requestBody))
        // Enviar la solicitud POST a la API para crear el proyecto
        const response = await fetch("https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects", {
            method: "POST",
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            alert("Proyecto creado con éxito");
            setTitle("");
            setDescription("");
            setFiles([]);
        } else {
            alert("Hubo un error al crear el proyecto");
        }

        setLoading(false); // Finaliza la carga

        // Redirigir al usuario
        router.push("/projects");
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Nuevo proyecto de diseño</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Título del proyecto */}
                <div>
                    <label htmlFor="title" className="block text-sm font-bold text-gray-700">Título del Proyecto:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-green-500 rounded-md shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm px-3"
                    />
                </div>

                {/* Descripción del proyecto */}
                <div>
                    <label htmlFor="description" className="block text-sm font-bold text-gray-700">Descripción del Proyecto:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-green-500 rounded-md shadow-sm focus:border-green-600 focus:ring-green-600 sm:text-sm px-3"
                    />
                </div>

                {/* Archivos del proyecto */}
                <div>
                    <label htmlFor="files" className="block text-sm font-bold text-gray-700">Archivos del Proyecto</label>
                    <input
                        id="files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    {files.length > 0 && (
                        <ul className="mt-2 space-y-1">
                            {files.map((file, index) => (
                                <li key={index} className="text-gray-700 text-sm">
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Botón de envío */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        disabled={loading} // Deshabilitar botón mientras carga
                    >
                        {loading ? "Creando..." : "Crear Proyecto"}
                    </button>
                </div>
            </form>
        </div>
    );
}
