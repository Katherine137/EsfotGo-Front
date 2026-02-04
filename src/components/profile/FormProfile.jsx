import { useEffect } from "react"
import storeProfile from "../../context/storeProfile"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"
const FormularioPerfil = () => {

    const { user, updateProfile } = storeProfile()
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const updateUser = (dataForm) =>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/actualizarperfil/${user._id}`
        updateProfile(url,dataForm)
    }

    useEffect(()=>{
        if (user) {
            reset({
                nombre: user?.nombre,
                apellido: user?.apellido,
                telefono: user?.telefono,
                email: user?.email,
            })
        }
    }, {user})

    return (

        <form onSubmit={handleSubmit(updateUser)}>
            <ToastContainer/>
            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Nombre</label>
                    <input type="text" placeholder="Ingresa tu nombre" className="block w-full rounded-md border
                    border-blue-500  py-1 px-1.5 text-neutral-950"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    />
                    {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Apellido</label>
                    <input type="text" placeholder="Ingresa tu apellido" className="block w-full rounded-md border
                    border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("apellido", { required: "El apellido es obligatorio" })}
                    />
                    {errors.apellido && <p className="text-red-800">{errors.apellido.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Teléfono</label>
                    <input type="text" inputMode="tel" placeholder="Ingresa tu teléfono" className="block w-full 
                    rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("telefono", { required: "El teléfono es obligatorio" })}
                    />
                    {errors.telefono && <p className="text-red-800">{errors.telefono.message}</p>}
            </div>

            <div className="mb-3">
                <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
                    <input
                    type="email" placeholder="Ingresa tu correo"
                    className="w-full rounded-md border border-blue-500 focus:ring-1 px-2 py-1 text-neutral-950"
                    {...register("email", { required: "El correo es obligatorio" })}
                    />
                    {errors.email && <p className="text-red-800">{errors.email.message}</p>}
            </div>

            <div className="mb-3">
                <input type="submit"
                className="block w-full py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300"
                value='Actualizar Perfil'
                />
            </div>

        </form>
    )
}

export default FormularioPerfil