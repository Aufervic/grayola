"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/utils/SessionContext";
import { useSessionContext } from "@/utils/SessionContext"; // Importamos el contexto
import Image from 'next/image';


export default function Navbar() {
  const pathname = usePathname(); // Obtiene la ruta actual
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, profile } = useSessionContext();  // Obtenemos la sesión y el perfil del usuario

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    console.log("Cerrar sesion bro")
    const { error } = await supabase.auth.signOut();  // Cerramos sesión con Supabase
    if (error) {
      console.log("Error al cerrar sesión", error.message);
    }else{
      console.log("Sesión cerrada con éxito")
      console.log("session", session)
      console.log("profile", profile)
      router.push("/")
    }
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logotipo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
              <Image
                src="/images/grayola_icon.png" // Ruta relativa a la carpeta "public"
                alt="Logo de Grayola"
                width={120} // Ancho de la imagen
                height={40} // Alto de la imagen
              />
            </Link>
          </div>

          {/* Navegación para pantallas grandes */}
          <div className="hidden md:flex space-x-8 items-center">
            {session ? (<Link
              href="/projects"
              className={`text-gray-700 hover:text-green-600 font-medium ${isActive("/projects") ? "text-green-600 font-bold" : ""
                }`}
            >
              Proyectos
            </Link>
            ) : (null)}

            {profile?.role === "Client" ? (
              <Link
                href="/projects/new"
                className={`text-gray-700 hover:text-green-600 font-medium ${isActive("/projects/new") ? "text-green-600 font-bold" : ""
                  }`}
              >
                Nuevo Proyecto
              </Link>
            ) : (<></>)}

            <Link
              href="/about"
              className={`text-gray-700 hover:text-green-600 font-medium ${isActive("/about") ? "text-green-600 font-bold" : ""
                }`}
            >
              Acerca de
            </Link>
          </div>

          {/* Mostrar el nombre del usuario y opción de cerrar sesión */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <div className="flex flex-col items-start">
                  <span className="text-gray-700 font-semibold">{profile?.first_name}</span>
                  {/* Mostrar el rol debajo del nombre */}
                  <span className="text-sm text-gray-500">{profile?.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-green-600 font-medium"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-gray-700 hover:text-green-600 font-medium ${isActive("/login") ? "text-green-600 font-bold" : ""
                    }`}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/signup"
                  className={"px-4 py-2 rounded-md hover:bg-green-700 bg-green-600 text-white"}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Abrir menú"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 border-t border-gray-200">
          <div className="space-y-1 p-4">
            <Link
              href="/projects"
              className={`block text-gray-700 hover:text-green-600 font-medium ${isActive("/projects") ? "text-green-600 font-bold" : ""
                }`}
            >
              Proyectos
            </Link>
            <Link
              href="/projects/new"
              className={`block text-gray-700 hover:text-green-600 font-medium ${isActive("/projects/new") ? "text-green-600 font-bold" : ""
                }`}
            >
              Nuevo Proyecto
            </Link>
            <Link
              href="/about"
              className={`block text-gray-700 hover:text-green-600 font-medium ${isActive("/about") ? "text-green-600 font-bold" : ""
                }`}
            >
              Contacto
            </Link>
            {session ? (
              <>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-gray-700 font-semibold">{profile?.first_name}</span>
                  <span className="text-sm text-gray-500">{profile?.role || 'Rol no asignado'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="block text-gray-700 hover:text-green-600 font-medium"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block text-gray-700 hover:text-green-600 font-medium ${isActive("/login") ? "text-green-600 font-bold" : ""
                    }`}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 rounded-md hover:bg-green-700 bg-green-600 text-white"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
