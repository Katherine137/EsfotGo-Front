import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../hooks/useFetch"

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const fetchDataBackend = useFetch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerUser = async (dataForm) => {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        let url = `${baseUrl}/api/registro`;

        switch (dataForm.rol) {
            case 'admin':
                url = `${baseUrl}/api/admin/registro`;
                break;
            case 'docente':
                url = `${baseUrl}/api/docente/registro`;
                break;
            default:
                url = `${baseUrl}/api/registro`;
        }

        const response = await fetchDataBackend(url, dataForm, "POST");
        
        if (response) {
            navigate('/Login');
        }
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <ToastContainer />

            {/* Imagen lateral */}
            <div className="hidden sm:block sm:w-1/2 bg-[url('/Dragon_1.png')] bg-cover bg-center"></div>

            <div className="bg-linear-to-b from-blue-950 to-rose-950 w-full sm:w-1/2 flex justify-center items-center p-4">
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-slate-500">Crear Cuenta</h1>
                    <p className="text-blue-300 text-center my-4">Por favor ingrese sus datos</p>

                    <form onSubmit={handleSubmit(registerUser)}>
                        
                        {/* SELECCIÓN DE ROL */}
                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Tipo de Usuario</label>
                            <select
                                {...register("rol", { required: "El rol es obligatorio" })}
                                className="w-full rounded-md border border-blue-500 focus:ring-1 px-2 py-2 text-neutral-950 bg-white"
                            >
                                <option value="user">Estudiante / Invitado</option>
                                <option value="docente">Docente</option>
                                <option value="admin">Administrador</option>
                            </select>
                            {errors.rol && <p className="text-red-900 text-xs mt-1">{errors.rol.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">Nombre</label>
                            <input type="text" placeholder="Ingresa tu nombre" 
                                className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                            />
                            {errors.nombre && <p className="text-red-900 text-xs mt-1">{errors.nombre.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">Apellido</label>
                            <input type="text" placeholder="Ingresa tu apellido" 
                                className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                                {...register("apellido", { required: "El apellido es obligatorio"})}
                            />
                            {errors.apellido && <p className="text-red-900 text-xs mt-1">{errors.apellido.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="mb-1 block text-sm font-semibold">Teléfono</label>
                            <input type="text" inputMode="tel" placeholder="Ingresa tu teléfono" 
                                className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                                {...register("celular", { required: "El teléfono es obligatorio"})}
                            />
                            {errors.celular && <p className="text-red-900 text-xs mt-1">{errors.celular.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
                            <input type="email" placeholder="Ingresa tu correo"
                                className="w-full rounded-md border border-blue-500 focus:ring-1 px-2 py-1 text-neutral-950"
                                {...register("email", {required: "El correo es obligatorio"})}
                            />
                            {errors.email && <p className="text-red-900 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    className="w-full rounded-md border border-blue-300 px-2 py-1 pr-10 text-neutral-950"
                                    {...register("password", { required: "La contraseña es obligatoria"})}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-neutral-950"
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-900 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="block w-full py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300">
                                Registrarse
                            </button>
                        </div>
                    </form>

                    <div className="mt-3 flex justify-between items-center text-sm">
                        <p className="text-neutral-950 font-medium">¿Ya tiene una cuenta?</p>
                        <Link to="/Login" className="block w-28 py-2 text-center bg-gray-500 text-white rounded-xl hover:bg-gray-900 duration-300"> 
                            Iniciar sesión 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};