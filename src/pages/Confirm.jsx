import {Link} from 'react-router'
import {useParams} from 'react-router'
import { ToastContainer} from 'react-toastify'
import { useFetch } from '../hooks/useFetch'
import { useEffect } from 'react'


export const Confirm = () => {

    const fetchDataBackend = useFetch()
    const { token } = useParams()
    
    const verifyToken = async()=>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/confirmar/${token}`
        await fetchDataBackend(url)
    }

    useEffect(() => {
        verifyToken()
    },[] )


    return (
        
        <div className="bg-linear-to-tr from-blue-950 via-red-900 to-black flex flex-col items-center justify-center h-screen">

            <ToastContainer/>
            
            <div className="object-cover h-80 w-80 border-4 rounded-full border-solid border-black bg-[url('/Dragon_Esfot.png')] bg-cover bg-center"></div>

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-white mt-12">Gracias por confirmar</p>
                <p className="md:text-lg lg:text-xl text-white mt-8">Ahora puedes iniciar sesión</p>
                <br />
                <Link to="/Login" className="bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md hover:bg-red-800 hover:scale-105 transition-transform duration-200">Iniciar Sesión</Link>
            </div>

        </div>
    )
}
