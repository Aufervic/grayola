import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl text-gray-700 mt-4">Página no encontrada.</p>
            <p className="text-lg text-gray-500 mt-2">Puedes regresar a la página principal.</p>

            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">Volver</Link>
        </div>
    )
}