
const FormEvent = () => {


    return (

        <form >
            <h2 className="text-blue-900">Crear evento</h2>
            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Nombre</label>
                    <input type="text" placeholder="Ingresa el nombre del evento" className="block w-full rounded-md border
                    border-blue-500  py-1 px-1.5 text-neutral-950"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    />
                    {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Organizador</label>
                    <input type="text" placeholder="Ingresa el nombre del Organizador" className="block w-full rounded-md border
                    border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("organizador", { required: "El organizador es obligatorio" })}
                    />
                    {errors.organizador && <p className="text-red-800">{errors.organizador.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Ubicación</label>
                    <input type="text" placeholder="Ingresa la ubicación del evento" className="block w-full rounded-md border
                    border-blue-500  py-1 px-1.5 text-neutral-950"
                    {...register("ubicación", { required: "La ubicación es obligatorio" })}
                    />
                    {errors.ubicacion && <p className="text-red-800">{errors.ubicacion.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Fecha</label>
                    <input type="date" id="Fecha" name="Fecha" className="block w-full 
                    rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("fecha", { required: "La fecha es obligatorio" })}
                    />
                    {errors.fecha && <p className="text-red-800">{errors.fecha.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Hora</label>
                    <input type="time" id="Hora" name="Hora" className="block w-full 
                    rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("hora", { required: "La hora es obligatorio" })}
                    />
                    {errors.hora && <p className="text-red-800">{errors.hora.message}</p>}
            </div>
            
            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Información</label>
                    <textarea 
                    placeholder="Ingresa la información del evento" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("informacion", { required: "La información es obligatoria" })}
                    />
                    {errors.informacion && <p className="text-red-800">{errors.informacion.message}</p>}
            </div>
            
            <div className="mb-3">
                <input type="submit"
                className="block w-full py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300"
                value='Crear Evento'
                />
            </div>

        </form>
    )
}

export default FormEvent