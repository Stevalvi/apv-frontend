import { useContext } from "react"; // Sirve para extraer los datos del context
import AuthContext from "../context/AuthProvider";

const useAuth = () => { // Por medio de esta función vamos a acceder a ese context de AuthProvider
    return useContext(AuthContext) // useContext es para hacer disponible ese context, osea ese AuthProvider y le pasamos el context al cual queremos acceder para extraer los valores
}

export default useAuth;