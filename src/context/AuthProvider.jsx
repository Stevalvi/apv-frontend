import { useState, useEffect, createContext } from "react"; // createContext nos va a permitir acceder al state de forma global en diferentes lugares de esta aplicación
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

const AuthContext = createContext() // Este va a tener unas funciones para habilitar conext API
const AuthProvider = ({children}) => { // Este tiene la sintaxis total de un componente y va a retornar el context.Con ese childrem le decimos que las rutas que están dentro del AuthProvider en el archivo de App.jsx son sus hijos

    const [cargando, setCargando] = useState(true); // Va a estar en true porque va a estar cargando, osea haciendo la consulta. Esto se hace para que permita cargar el tiempo suficiente mientras el usuario inicie sesión para poder dejarlo ingresar a la página de /admin. 

    // Acá fuera del return se define el state que va a estar disponible globalmente
    const [ auth, setAuth ] = useState({}); // Este state ya va a estar disponible en cualquier lugar. A ese value del AuthContext.Provider le damos los valores que queremos que sean disponibles para ese custom hoock del archivo useAuth.jsx

    const navigate = useNavigate()

    // Cuando esté listo ese AuthProvider se ejecuta este useEffect()
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token') // Obtenemos ese token

            if(!token) {
                setCargando(false)
                return
            } // Si no hay un token detiene el código con ese return

            // Creamos una nueva configuraciónd e clienteAxios
            const config = {
                headers: { // Estos headers se envían antes de toda la petición, es como el encabezado y es la autorización que tenemos en el postman, donde se asignan los bearer token
                    "Content-Type": "application/json", // Le decimos que el próximo request es json
                    Authorization: `Bearer ${token}` 
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config) // Recordemos que por default es tipo get, por eso no le especificamos el .get. Esto lo que hace es que cuando enviemos las peticiones post que tienen que ser autenticadas va a la url, después los datos, después la configuración que le definimos.

                setAuth(data) // De esta forma ya va a estar en el state() la información del usuario que esté autenticado
                navigate("/admin")
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({}) // En caso de que haya un error para asegurarnos le colocamos un objeto vacío para que se mantenga vacío y no esté autenticado el usuario
            }

            setCargando(false) // Una vez que revise el código de arriba, pasa a ser false para que deje de cargar
        }
        autenticarUsuario()
    }, []) // Le colocamos aqui las dependencias vacías para que se ejecute una sola vez

    const cerrarSesion = () => {
        localStorage.removeItem('token') // Eliminamos el token para poder cerrar sesion
        setAuth({}) // Lo convertimos en un objeto vacío
    }

    const actualizarPerfil = async datos => {

            const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            } 

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                }
            }

            try {
                const url = `/veterinarios/perfil/${datos._id}` // Esta es la petición y toma el id para verificar
                const { data } = await clienteAxios.put(url, datos, config);

                return {
                    msg: 'Almacenado Correctamente'
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg, 
                    error:true
                }
            }
    }

    const guardarPassword = async (datos) => {
        
        const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            } 

            const config = {
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}` 
                }
            }

            try {
                const url = '/veterinarios/actualizar-password'

                const { data } = await clienteAxios.put(url, datos, config)
                
                return {
                    msg: data.msg
                }

            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
    }

    return(  
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando,
                cerrarSesion, 
                actualizarPerfil,
                guardarPassword
            }}
        >

            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;