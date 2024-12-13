
export default function AboutPage() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 via-yellow-100 to-cyan-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-green-600 text-center mb-8">
                    Acerca de las Cuentas en el Sistema
                </h2>

                <div className="space-y-12">
                    {/* Notas */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold text-red-800 mb-4">Notas:</h3>
                        <div className="mt-4">
                            <h4 className="font-semibold text-red-800">¡Importante!</h4>
                            <ul className="list-disc list-inside text-red-700">
                                <li>El correo usado para registrarse en el sistema debe ser real, de esta manera podrá aceptar el correo de confirmación, de otro modo no podrá ingresar.</li>
                                <li>El registro de correos desde una misma IP está limitado.</li>
                                <li>Algunos problemas se solucionan recargando.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Clientes */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Clientes</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Los clientes pueden crear un proyecto de diseño y ver los proyectos que le pertenecen.
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            A continuación se proporciona un correo de un Cliente registrado en el sistema.
                        </p>
                        <div className="space-y-2">
                            <p className="text-lg text-gray-700">
                                <strong>Correo:</strong> catusscor@gmail.com
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong>Contraseña:</strong> 123456
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-gray-800">Permisos:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Crear un proyecto de diseño con título, descripción y varios archivos.</li>
                                <li>Ver los proyectos que le pertenecen.</li>
                                <li>Ver el detalle de sus proyectos.</li>
                            </ul>
                        </div>
                        <div className="mt-4 text-gray-600">
                            <strong>Nota:</strong> Los clientes no pueden editar un proyecto una vez creado.
                        </div>
                    </div>

                    {/* Project Managers */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Project Managers</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Los project managers pueden gestionar los proyectos de los clientes, asignar tareas a los diseñadores. Tienen acceso completo a las configuraciones y detalles de los proyectos.
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            A continuación se proporciona el correo de un Project Manager registrado en el sistema.
                        </p>
                        <div className="space-y-2">
                            <p className="text-lg text-gray-700">
                                <strong>Correo:</strong> aufer.vicc@gmail.com
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong>Contraseña:</strong> 123456
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-gray-800">Permisos:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Puede ver todos los clientes.</li>
                                <li>Asignar tareas a los diseñadores.</li>
                                <li>Editar un proyecto, cambiar el título, la descripción, eliminar los archivos subidos y/o agregar nuevos.</li>
                                <li>Eliminar un proyecto.</li>
                                <li>Ver el detalle de cualquier proyecto.</li>
                            </ul>
                        </div>
                        <div className="mt-4 text-gray-600">
                            <strong>Nota:</strong> Los Project Managers no pueden crear un proyecto nuevo.
                        </div>
                    </div>

                    {/* Diseñadores */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Diseñadores</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Los diseñadores tienen acceso a los proyectos asignados, donde pueden realizar las tareas de diseño solicitadas por los clientes y project managers.
                        </p>
                        <p className="text-lg text-gray-700 mb-4">
                            A continuación se proporciona el correo de un Diseñador registrado en el sistema.
                        </p>
                        <div className="space-y-2">
                            <p className="text-lg text-gray-700">
                                <strong>Correo:</strong> aufermaru@gmail.com
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong>Contraseña:</strong> 123456
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-gray-800">Permisos:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Ver los proyectos asignados.</li>
                                <li>Ver el detalle de un proyecto asignado</li>
                            </ul>
                        </div>
                        <div className="mt-4 text-gray-600">
                            <strong>Nota:</strong> Los diseñadores no pueden crear, editar ni eliminar un proyecto.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

