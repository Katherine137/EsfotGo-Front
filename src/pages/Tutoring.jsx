import { useEffect } from "react"
import { useNavigate } from "react-router"
import storeAuth from "../context/storeAuth"
import { CardTutoring } from "../components/Tutoring/CardTutoring"
import FormTutoring from "../components/Tutoring/FormTutoring"
import CardUpdate from "../components/Tutoring/CardUpdate"

const Tutoring = () =>{
    const { rol } = storeAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (rol !== 'docente') {
            navigate('/dashboard')
        }
    }, [rol, navigate])

    return(
        <>
            <div>
                <h1 className='font-black text-4xl text-blue-950'>Aula</h1>
                <br />
            </div>

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <div className="w-full md:w-1/2">
                    <CardTutoring/>
                </div>

                <div className="w-full md:w-1/2">
                    <CardTutoring/>
                </div>
            </div>

            <br />

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                
                <div className='w-full md:w-1/2'>
                    <FormTutoring/>
                </div>

                <div className='w-full md:w-1/2 '>
                    <CardUpdate/>
                </div>
        
            </div>

        </>
    )
}

export default Tutoring