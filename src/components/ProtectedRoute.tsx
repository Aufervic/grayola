// src/components/ProtectedRoute.tsx
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSessionContext } from '@/utils/SessionContext'; // Asegúrate de que el contexto esté en la ruta correcta

interface ProtectedRouteProps {
  children: ReactNode; // Aquí estamos diciendo que `children` puede ser cualquier cosa que React pueda renderizar
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session } = useSessionContext();
  const router = useRouter();

  useEffect(() => {
    // Si no hay sesión (usuario no está autenticado), redirigir al login
    if (!session) {
      router.push('/login'); // Cambia '/login' por la ruta de tu página de inicio de sesión
    }
  }, [session, router]);

  // Si no hay sesión, no renderizamos nada mientras redirigimos
  if (!session) {
    return null; // Mientras rediriges, puedes mostrar un loading o nada
  }

  // Si hay sesión, renderizamos los `children` (el contenido protegido)
  return <>{children}</>;
};

export default ProtectedRoute;
