import axios from "axios";

const clienteAxios = axios.create({ // Creamos una url de base para no tener que colocar esas variables de entorno siempre que las usemos en los dempas archivos.
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api` // En baseURL le pasamos el dominio o endpoitn principal en el cuál se van a hacer esas peticiones.

})

export default clienteAxios;