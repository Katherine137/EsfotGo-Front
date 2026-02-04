import { CardEvent } from "../components/event/CardEvent"
import CardUpdate from "../components/event/CardUpdate"
import FormEvent from "../components/event/FormEvent"



const Event = () => {
    
    return (
        <>       
            <div>
                <h1 className='font-black text-4xl text-blue-950'>Eventos</h1>
                <br />
            </div>

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <div className="w-full md:w-1/2">
                    <CardEvent/>
                </div>

                <div className="w-full md:w-1/2">
                    <CardEvent/>
                </div>
            </div>

            <br />

            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                
                <div className='w-full md:w-1/2'>
                    <FormEvent/>
                </div>

                <div className='w-full md:w-1/2 '>
                    <CardUpdate/>
                </div>
        
            </div>

        </>

    )
}

export default Event