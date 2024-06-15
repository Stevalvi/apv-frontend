import { createContext, useState, useEffect } from "react"; // Para crear el context, usestate porque vamos a tener un state, y un useeffect porque una vez que el paciente se registre lo vamos a moostrar en la lista de pacientes
import clienteAxios from '../config/axios';
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext() // Crea el conetxt

export const PacientesProvider = ({children}) => { // Es de donde vienen los datos

    const [pacientes, setPacientes] = useState([]) ;// Lo definimos como un arreglo de pacientes, ya que vamos a tener múltiples pacientes. Así que hacemos disponible el pacientes en el provider de abajo. setPacientes va a residir en este provider
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth(); // Esto se hace para que una vez iniciemos sesión con el veterinario, carguen sus pacientes automáticamente en la lista de pacientes sin necesidad de tener que recargar para que aparezcan.

    useEffect(() => { // Cuando cargue el Provider se va a ejecutar, va a consultar la API y va a traernos los resultados.
        const obtenerPacientes = async () => { // Vamos a consultar nuestra API

            try {
                const token = localStorage.getItem('token') // Primero obtenemos el token porque ahí es donde est'a la información del id del veterinario
                if(!token) return // Si no hay un token entonces return
                
                const config = {
                    headers: { // Para que sea lo primero que se mande
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config ) // le damos que es hacia /pacientes que se irán esos pacientes una vez se registren,  el otro valor que toma el axios es la configuración del request autenticado.

                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth]) // Esto se hace para que una vez iniciemos sesión con el veterinario, carguen sus pacientes automáticamente en la lista de pacientes sin necesidad de tener que recargar para que aparezcan.

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: { // Para que sea lo primero que se mande
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        // Actualizamos los pacientes
        if(paciente.id) { // Si hay un id actualizamos ese paciente, en caso de que estemo editando se ejecuta ese if.
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config) // Le pasamos la url y el id de como los almacena mongodb, luego el cuerpo osea el body de los pacientes que vamos a actualizar y la configuración del token, 

                // Sincronizamos la api de editado con el state para que se reflejen los cambios en la página
                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState ) // Iteramos sobre el state de pacientes. Es decir si pacienteState._id que viene más sincronizado desde el servidor, si es igual a === data._id, ? entonces vas a retornar lo que haya en data, caso contrario va a retornar lo que haya en pacienteState
                setPacientes(pacientesActualizado) // Guardamos cambios
            } catch (error) {
                console.log(error)
            }
        } else { // Caso tal de que sea un nuevo paciente se ejecuta el else

            try { // Como ya validamos podemos hacer el llamado
                
                const { data } = await clienteAxios.post('/pacientes', paciente, config) // Le especificamos que es de tipo post, le damos que es hacia /pacientes que se irán esos pacientes una vez se registren, el siguiente parámetro son los datos del paciente, en este caso los contiene el parámetro paciente de la función guardarPaciente y el tercer valor que toma el axios es la configuración del request autenticado.
    
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; // Para que nos retorne ciertos valores que necesitamos y no todos los valores innecesarios. Esto lo que hace es crear un nuevo objeto llamado pacienteAlmacenado con los valores que no agregamos en el destructuring, es decir nos traerá todo lo demás excepto createdAt, updatedAt, __v 
                setPacientes([pacienteAlmacenado, ...pacientes]) // Modificamos el pacienteAlmacenado y tomamos una copia de lo que haya en paciente. De esta forma se va a mostrar primero el nuevo paciente.
            } catch (error) {
                console.log(error.response.data.msg)
            }
        } 
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente) // Como ya estamos iterando en el listado de pacientes, no tiene sentido que volvamos a iterar en el Provider, por eso lo hacemos de esta forma. 
    }

    // Eliminar un Paciente
    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar ?')

        if(confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: { // Para que sea lo primero que se mande
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)

                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id) // Con filter le decimos que queremos traernos esos elementos diferentes al id que hemos eliminado
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return( 
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion, 
                paciente, 
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;