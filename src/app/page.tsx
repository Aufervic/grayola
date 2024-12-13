import Link from "next/link";
import Image from "next/image"

export default function Home() {
  return (
    
<div className="h-screen bg-gradient-to-br from-green-500 via-teal-400 to-cyan-500 flex flex-col justify-center items-center relative">
  <div className="text-center p-16">
    {/* Imagen encima de la palabra Grayola */}
    <div className="mb-4 animate-bounce flex justify-center">
      <Image 
        src="/images/grayola_fly.png"  // Ruta de la imagen
        alt="Logo de Grayola"
        width={200}               // Ajusta el tamaño de la imagen
        height={320}
        priority
      />
    </div>

    {/* Título de la página */}
    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 font-geist-sans">
      Grayola
    </h1>

    {/* Párrafo descriptivo */}
    <p className="text-lg sm:text-xl text-gray-800 mb-6 font-geist-sans max-w-4xl mx-auto">
      Grayola es una startup de diseño como servicio, operamos diseño gráfico, edición de video y diseño UX/UI para compañías en todo el mundo a gran escala.
    </p>

    {/* Botón de registro */}
    <Link href="/signup">
      <button className="px-6 py-3 bg-green-600 text-white font-semibold text-lg rounded-md hover:bg-green-700 transition duration-300">
        Registrarse
      </button>
    </Link>
  </div>
</div>


  

    
  );
}
