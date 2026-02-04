import { useEffect } from "react"
import { useNavigate } from "react-router"
import storeAuth from "../context/storeAuth"
import { CardClassroom } from "../components/Classroom/CardClassroom"
import CardUpdate from "../components/Classroom/CardUpdate"
import FormClassroom from "../components/Classroom/FormClassroom"

const Classroom = () =>{
    const { rol } = storeAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (rol !== 'docente' && rol !== 'admin') {
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
                    <CardClassroom/>
                </div>

                <div className="w-full md:w-1/2">
                    <CardClassroom/>
                </div>
            </div>

            <br />

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                
                <div className='w-full md:w-1/2'>
                    <FormClassroom/>
                </div>

                <div className='w-full md:w-1/2 '>
                    <CardUpdate/>
                </div>
        
            </div>

        </>
    )
}

export default Classroom