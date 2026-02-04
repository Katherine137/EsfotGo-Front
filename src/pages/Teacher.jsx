import { useEffect } from "react"
import { useNavigate } from "react-router"
import storeAuth from "../context/storeAuth"
import { CardTeacher } from "../components/Docente/CardTeacher"
import FormTeacher from "../components/Docente/FormTeacher"
import CardPassword from "../components/Docente/CardPassword"

const Teacher = () =>{
    const { rol } = storeAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (rol !== 'admin') {
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
                    <CardTeacher/>
                </div>

                <div className="w-full md:w-1/2">
                    <CardTeacher/>
                </div>
            </div>

            <br />

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                
                <div className='w-full md:w-1/2'>
                    <FormTeacher/>
                </div>

                <div className='w-full md:w-1/2 '>
                    <CardPassword/>
                </div>
        
            </div>

        </>
    )
}

export default Teacher