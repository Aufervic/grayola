"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/utils/SessionContext";
// const supabase = createClient("https://efoeppbhiedlznwxecaa.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8");


interface Project {
  id: string;
  title: string;
  description: string;
  files: string[]; // URLs of uploaded files
}

export default function EditProject() {
  const params = useParams();
  const projectID = params.id;

  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (!projectID) return;

    const fetchProject = async () => {
      const response = await fetch(
        `https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects?id=eq.${projectID}`,
        {
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const projectData = data[0];
        setProject(projectData);
        setTitle(projectData.title);
        setDescription(projectData.description);
        setExistingFiles(projectData.files || []);
      } else {
        console.log("Error fetching project data");
      }
    };

    fetchProject();
  }, [projectID]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const toggleFileToDelete = (fileUrl: string) => {
    setFilesToDelete((prev) => {
      if (prev.includes(fileUrl)) {
        return prev.filter((url) => url !== fileUrl);
      } else {
        return [...prev, fileUrl];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Delete selected files from Supabase storage
    for (const fileUrl of filesToDelete) {
      const fileName = fileUrl.split("/public/")[1];
      const { error } = await supabase.storage.from("projects").remove([`public/${fileName}`]);

      if (error) {
        console.log("Error deleting file:", error);
        return;
      }
    }

    const remainingFiles = existingFiles.filter((url) => !filesToDelete.includes(url));

    // Upload new files to Supabase storage
    const uploadedFileUrls: string[] = [];
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("projects")
        .upload(`public/${Date.now()}-${file.name}`, file);

      if (error) {
        console.log("Error uploading file:", error);
        return;
      }

      const publicUrl = supabase.storage
        .from("projects")
        .getPublicUrl(data.path).data.publicUrl;

      if (publicUrl) {
        uploadedFileUrls.push(publicUrl);
      }
    }

    // Update project in Supabase
    const updatedProject = {
      title,
      description,
      files: [...remainingFiles, ...uploadedFileUrls],
    };

    const response = await fetch(
      `https://efoeppbhiedlznwxecaa.supabase.co/rest/v1/projects?id=eq.${projectID}`,
      {
        method: "PATCH",
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmb2VwcGJoaWVkbHpud3hlY2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NjYzMTcsImV4cCI6MjA0OTM0MjMxN30.l9A4wpr6OzW0FtO2vYj6HKs50T_ZJzOX6jhCw5GxAG8",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      }
    );

    if (response.ok) {
      alert("Proyecto actualizado con éxito");
      router.push("/projects");
    } else {
      alert("Hubo un error al actualizar el proyecto");
    }
  };

  if (!project) {
    return (
      <div className='p-6 bg-gradient-to-br from-green-100 via-cyan-200 to-yellow-100 min-h-screen'>
        <p className="text-center">Cargando...</p>
      </div>
    )
  }

  return (
    <div className='p-6 bg-gradient-to-br from-green-100 via-cyan-200 to-yellow-100 min-h-screen'>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-green-100 ">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Editar proyecto ({projectID})</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título del proyecto */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700">
              Título del Proyecto:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200 sm:text-sm px-3"
            />
          </div>

          {/* Descripción del proyecto */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700"
            >
              Descripción del Proyecto:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-green-200 sm:text-sm px-3"
            />
          </div>

          {/* Archivos existentes */}
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Archivos existentes <span className="text-red-500">(Selecciona los archivos que deseas borrar)</span>:
            </label>
            <ul className="mt-2 space-y-1">
              {existingFiles.map((fileUrl, index) => (
                <li key={index} className="text-gray-700 text-sm flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => toggleFileToDelete(fileUrl)}
                    className="mr-2"
                  />
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                    {fileUrl.split("/").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Subir nuevos archivos */}
          <div>
            <label htmlFor="files" className="block text-sm font-bold text-gray-700">
              Subir nuevos archivos
            </label>
            <input
              id="files"
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 px-3"
            />
          </div>

          {/* Botón de envío */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
