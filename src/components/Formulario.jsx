import { useState, useEffect } from "react";
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null) // Ese state va a estar vacío, osea no va a tener ningún id, pero cuando el usuario vaya a editar el paciente, se guarda ese id.

    const [alerta, setAlerta] = useState({})

    const { guardarPaciente, paciente } = usePacientes() // Abrimos llaves porque lo que retorna el Provider es un objeto. Importamos paciente para que el usuario cuando vaya a editar ese paciente se llene el formulario con la información.

    useEffect(() => { // Este useeffect es para que ecuando el usuario vaya a editar el paciente se llene ese formulario con la información automáticamente
        if(paciente?.nombre) { // Esto va a revisar las propiedades del objeto y si hay algo lo va a setear en cada uno de los campos, de esta forma se llenan los campos del formulario con esa información al momento de editar
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente]) // Le pasamos como dependencia a paciente para que esté pendiente de los cambios constantes de ese state.

    const handleSubmit = e => {
        e.preventDefault()

        // Una vez que estemos ingresando los pacientes los vamos a tener en un context, por eso no lo hacemos asincrono

        // Validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id }) // Una vez el paciente se registre creamos un nuevo objeto con esa información
        setAlerta({
            msg: 'Guardado Correctamente'
        }) // En caso de que se editen los pacientes le mandamos este mensaje al usuario.

        // Reiniciamos o seteamos todos los campos para que una vez editados se reinicie ese formulario y no quede la información ahí.
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }
    const { msg } = alerta

  return (
    <>

        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

        <p className="text-xl mt-5 mb-10 text-center">
            Añade tus pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Nombre de la Mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)} // Para colocarlo en el state
                />
            </div>

            <div className="mb-5">
                <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
                <input
                    id="propietario"
                    type="text"
                    placeholder="Nombre del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)} // Para colocarlo en el state
                />
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email Propietario</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email del propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)} // Para colocarlo en el state
                />
            </div>

            <div className="mb-5">
                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
                <input
                    id="fecha"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)} // Para colocarlo en el state
                />
            </div>

            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea
                    id="sintomas"
                    placeholder="Describe los Sintomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)} // Para colocarlo en el state
                />
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value={ id ? 'Guardar Cambios': 'Agregar Paciente'} // Cuando vayamos a editar ese paciente se cambia el botón a guardar cambios, de lo contrario se queda en agregar paciente
            />
        </form>
    
        {msg && <Alerta alerta={alerta} />}
    
    </>
  )
};

export default Formulario