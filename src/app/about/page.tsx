
export default function AboutPage() {

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-green-600 text-center mb-8">
                    Acerca de las Cuentas en el Sistema
                </h2>

                <div className="space-y-12">
                    {/* Clientes */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Clientes</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Los clientes pueden acceder a su área personal para gestionar proyectos, ver el estado de su trabajo y comunicarse con los diseñadores. Los correos y contraseñas de los clientes son privados y deben mantenerse de forma segura.
                        </p>
                        <div className="space-y-2">
                            <p className="text-lg text-gray-700">
                                <strong>Correo:</strong> cliente@example.com
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong>Contraseña:</strong> **********
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-gray-800">Permisos:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Ver el estado de los proyectos.</li>
                                <li>Comunicarte con los diseñadores para comentarios.</li>
                                <li>Solicitar modificaciones o ajustes en los proyectos.</li>
                            </ul>
                        </div>
                        <div className="mt-4 text-gray-600">
                            <strong>Nota:</strong> Los clientes pueden crear hasta 3 cuentas en el sistema por organización.
                        </div>
                    </div>

                    {/* Project Managers */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Project Managers</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Los project managers pueden gestionar los proyectos de los clientes, asignar tareas a los diseñadores, y revisar el progreso. Pueden tener acceso completo a las configuraciones y detalles de los proyectos.
                        </p>
                        <div className="space-y-2">
                            <p className="text-lg text-gray-700">
                                <strong>Correo:</strong> manager@example.com
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong>Contraseña:</strong> **********
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-gray-800">Permisos:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Gestionar los proyectos de los clientes.</li>
                                <li>Asignar tareas a los diseñadores.</li>
                                <li>Revisar el progreso y hacer ajustes en los proyectos.</li>
                            </ul>
                        </div>
                        <div className="mt-4 text-gray-600">
                            <strong>Nota:</strong> Los project managers pueden crear hasta 5 cuentas por proyecto.
                        </div>
                    </div>

                    {/* Diseñadores */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Diseñadores</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            Los diseñadores tienen acceso a los proyectos asignados, donde pueden realizar las tareas de diseño solicitadas por los clientes y project managers. Su objetivo principal es crear y modificar los diseños conforme a los requerimientos.
                        </p>
                        <div className="space-y-2">
                            <p className="text-lg text-gray-700">
                                <strong>Correo:</strong> diseñador@example.com
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong>Contraseña:</strong> **********
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="font-semibold text-gray-800">Permisos:</h4>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Acceder y editar los proyectos asignados.</li>
                                <li>Subir archivos de diseño, como imágenes o PDFs.</li>
                                <li>Comunicar avances y cambios en los diseños.</li>
                            </ul>
                        </div>
                        <div className="mt-4 text-gray-600">
                            <strong>Nota:</strong> Los diseñadores pueden ser asignados a proyectos de cualquier cliente, pero no tienen la capacidad de crear cuentas nuevas.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

