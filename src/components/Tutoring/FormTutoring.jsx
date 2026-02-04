import { useState } from 'react'

const FormTutoring = () => {
    const [horarios, setHorarios] = useState([
        { dia: '', horaInicio: '', horaFin: '' }
    ])

    const agregarHorario = () => {
        setHorarios([...horarios, { dia: '', horaInicio: '', horaFin: '' }])
    }

    const eliminarHorario = (index) => {
        const nuevosHorarios = horarios.filter((_, i) => i !== index)
        setHorarios(nuevosHorarios)
    }

    const handleHorarioChange = (index, campo, valor) => {
        const nuevosHorarios = [...horarios]
        nuevosHorarios[index][campo] = valor
        setHorarios(nuevosHorarios)
    }

    return (
        <form>
            <h2 className="text-blue-900">Crear Tutoría</h2>
            
            <div className="mb-3">
                <label htmlFor="docente" className="mb-1 block text-sm font-semibold">Docente</label>
                <input 
                    type="text" 
                    id="docente"
                    name="docente"
                    placeholder="Ingresa el nombre del docente" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("docente", { required: "El docente es obligatorio" })}
                />
                {errors.docente && <p className="text-red-800">{errors.docente.message}</p>}
            </div>

            <div className="mb-3">
                <label htmlFor="oficina" className="mb-1 block text-sm font-semibold">Oficina</label>
                <input 
                    type="text" 
                    id="oficina"
                    name="oficina"
                    placeholder="Ingresa el número de oficina" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("oficina", { required: "La oficina es obligatoria" })}
                />
                {errors.oficina && <p className="text-red-800">{errors.oficina.message}</p>}
            </div>

            <div className="mb-3">
                <label className="mb-1 block text-sm font-semibold">Horarios</label>
                
                <div className="space-y-3">
                    {horarios.map((horario, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <select 
                                value={horario.dia}
                                onChange={(e) => handleHorarioChange(index, 'dia', e.target.value)}
                                className="rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                            >
                                <option value="">Seleccione día</option>
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miércoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                            </select>

                            <span className="text-sm">de</span>

                            <input 
                                type="time" 
                                value={horario.horaInicio}
                                onChange={(e) => handleHorarioChange(index, 'horaInicio', e.target.value)}
                                className="rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                            />

                            <span className="text-sm">a</span>

                            <input 
                                type="time" 
                                value={horario.horaFin}
                                onChange={(e) => handleHorarioChange(index, 'horaFin', e.target.value)}
                                className="rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                            />

                            {horarios.length > 1 && (
                                <button 
                                    type="button"
                                    onClick={() => eliminarHorario(index)}
                                    className="text-red-600 hover:text-red-800 font-bold"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <button 
                    type="button"
                    onClick={agregarHorario}
                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                    + Agregar otro horario
                </button>
            </div>
            
            <div className="mb-3">
                <label htmlFor="informacion" className="mb-1 block text-sm font-semibold">Información</label>
                <textarea 
                    id="informacion"
                    name="informacion"
                    placeholder="Ingresa la información de la tutoría" 
                    className="block w-full rounded-md border border-blue-500 py-1 px-1.5 text-neutral-950"
                    {...register("informacion", { required: "La información es obligatoria" })}
                />
                {errors.informacion && <p className="text-red-800">{errors.informacion.message}</p>}
            </div>
            
            <div className="mb-3">
                <input 
                    type="submit"
                    className="block w-full py-2 text-center bg-red-900 text-white rounded-xl hover:bg-gray-900 duration-300"
                    value='Crear Tutoría'
                />
            </div>
        </form>
    )
}

export default FormTutoring