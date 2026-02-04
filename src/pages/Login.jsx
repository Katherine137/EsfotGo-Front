import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useFetch } from '../hooks/useFetch'
import { ToastContainer } from "react-toastify";
import { useForm } from 'react-hook-form'
import storeAuth from "../context/storeAuth";
import storeProfile from "../context/storeProfile";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRol, setSelectedRol] = useState('user');
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }} = useForm()
    const fetchDataBackend = useFetch()
    const { setAuth } = storeAuth()
    const { profile } = storeProfile()

    const getLoginUrl = (rol) => {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        switch(rol) {
            case 'admin':
                return `${baseUrl}/api/admin/login`;
            case 'docente':
                return `${baseUrl}/api/docente/login`;
            case 'user':
            case 'invitado':
                return `${baseUrl}/api/login`;
            default:
                return `${baseUrl}/api/login`;
        }
    }

    const loginUser = async(dataForm) => {
        const url = getLoginUrl(selectedRol);
        const response = await fetchDataBackend(url, dataForm, "POST");
        
        if(response && response.token) {
            setAuth(response.token, selectedRol, response.id || response._id);
            await profile();
            navigate('/dashboard');
        }
    }

    // Nota: El botón de Google ahora es un <a> directo para evitar conflictos de redirección
    return (
        <div className="flex flex-col sm:flex-row h-screen">

            <ToastContainer/>
            
            {/* AQUÍ ESTÁ TU DRAGÓN - NO SE TOCA */}
            <div className="hidden sm:block sm:w-1/2 bg-[url('./assets/dragon.png')] bg-cover bg-center"></div>
            
            <div className="bg-linear-to-b from-blue-950 to-rose-950 w-full sm:w-1/2 flex justify-center items-center p-4">
            
                <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center text-slate-500">Bienvenido(a)</h1>
                
                    <p className="text-blue-300 text-center my-4">Por favor ingrese sus credenciales</p>

                    <form onSubmit={handleSubmit(loginUser)}>
                    
                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Tipo de Usuario</label>
                            <select
                                value={selectedRol}
                                onChange={(e) => setSelectedRol(e.target.value)}
                                className="w-full rounded-md border border-blue-500 focus:ring-1 px-2 py-2 text-neutral-950 bg-white"
                            >
                                <option value="estudiante">Estudiante / Invitado</option>
                                <option value="docente">Docente</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo"
                                className="w-full rounded-md border border-blue-500 focus:ring-1 px-2 py-1 text-neutral-950"
                                {...register("email", { required: "El correo es obligatorio" })}
                            />
                            {errors.email && <p className="text-red-900 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-semibold mb-1">Contraseña</label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="************"
                                    className="w-full rounded-md border border-blue-300 px-2 py-1 pr-10 text-neutral-950"
                                    {...register("password", { required: "La contraseña es obligatoria" })}
                                />
                                {errors.password && <p className="text-red-900 text-sm mt-1">{errors.password.message}</p>}

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-neutral-950 hover:text-neutral-600"
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl 
                            hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    {/* DIVISOR VISUAL */}
                    <div className="flex items-center my-4">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-2 text-gray-400 text-xs uppercase">o</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    
                    <a 
                        href="http://localhost:3000/auth/login/federated/google" 
                        className="flex items-center justify-center gap-3 w-full py-3 rounded-lg border-2 border-gray-300 shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-bold text-gray-700 bg-white"
                    >
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            alt="Google" 
                            className="w-6 h-6"
                        />
                        Google Workspace
                    </a>

                    <div className="mt-3 flex justify-between text-sm">
                        <Link to="/forgot/id" className="text-neutral-950 hover:text-blue-900 font-medium">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <Link to="/" className="text-neutral-950 hover:text-blue-900 font-medium">
                            Hogar
                        </Link>
                    </div>
                    <br />
                    <div className="flex justify-center">
                        <Link to="/Register" className="block w-24 py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300">
                            Registrarse
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;