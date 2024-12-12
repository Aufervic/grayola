"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname(); // Obtiene la ruta actual
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-100 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logotipo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
              Grayola
            </Link>
          </div>

          {/* Navegación para pantallas grandes */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/projects"
              className={`text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/projects") ? "text-green-600 font-bold" : ""
              }`}
            >
              Proyectos
            </Link>
            <Link
              href="/projects/new"
              className={`text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/projects/new") ? "text-green-600 font-bold" : ""
              }`}
            >
              Nuevo Proyecto
            </Link>
            <Link
              href="/contact"
              className={`text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/contact") ? "text-green-600 font-bold" : ""
              }`}
            >
              Contacto
            </Link>
          </div>

          {/* Botones para pantallas grandes */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className={`text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/login") ? "text-green-600 font-bold" : ""
              }`}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/signup"
              className={`px-4 py-2 rounded-md hover:bg-green-700 ${
                isActive("/signup") ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              Regístrate
            </Link>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
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
              className={`block text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/projects") ? "text-green-600 font-bold" : ""
              }`}
            >
              Proyectos
            </Link>
            <Link
              href="/projects/new"
              className={`block text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/projects/new") ? "text-green-600 font-bold" : ""
              }`}
            >
              Nuevo Proyecto
            </Link>
            <Link
              href="/contact"
              className={`block text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/contact") ? "text-green-600 font-bold" : ""
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/login"
              className={`block text-gray-700 hover:text-gray-900 font-medium ${
                isActive("/login") ? "text-green-600 font-bold" : ""
              }`}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/signup"
              className={`block px-4 py-2 rounded-md hover:bg-green-700 ${
                isActive("/signup") ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              Regístrate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
