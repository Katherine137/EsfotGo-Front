const FormClassroom = () => {

    return (
        <form>
            <h2 className="text-blue-900">Crear Aula</h2>
            
            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Edificio</label>
                <input 
                    type="text" placeholder="Ingresa el edificio" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("edificio", { required: "El edificio es obligatorio" })}
                />
                    {errors.edificio && <p className="text-red-800">{errors.edificio.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Ubicación</label>
                <input 
                    type="text" placeholder="Ingresa la ubicación" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("ubicacion", { required: "La ubicacion es obligatorio" })}
                />
                    {errors.ubicacion && <p className="text-red-800">{errors.ubicacion.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Número</label>
                <input 
                    type="text" placeholder="Ingresa el número del aula" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("numero", { required: "El numero es obligatorio" })}
                />
                    {errors.numero && <p className="text-red-800">{errors.numero.message}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="tipo" className="mb-1 block text-sm font-semibold">Tipo</label>
                <select id="tipo" name="tipo" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("tipo", { required: "El tipo es obligatorio" })}
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="aula">Aula</option>
                    <option value="laboratorio">Laboratorio</option>
                </select>
                    {errors.tipo && <p className="text-red-800">{errors.tipo.message}</p>}
            </div>
            
            <div className="mb-3">
                <input 
                    type="submit"
                    className="block w-full py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300"
                    value='Crear Aula'
                />
            </div>
        </form>
    )
}

export default FormClassroom