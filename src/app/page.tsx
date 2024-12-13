import Link from "next/link";

export default function Home() {
  return (
    
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-center p-60">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">
          Grayola
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Grayola es una startup de diseño as a service, operamos diseño gráfico, edición de video y diseño UX/UI para compañías en todo el mundo a gran escala.
        </p>
        <Link href="/signup">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold text-lg rounded-md hover:bg-green-700 transition duration-300">
            Regístrate
          </button>
        </Link>
      </div>
    </div>
    
  );
}
