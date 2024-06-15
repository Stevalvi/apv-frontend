import { useContext } from "react"; // Sirve para extraer los datos del context
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => { // Por medio de esta función vamos a acceder a ese context de PacientesProvider
    return useContext(PacientesContext) // useContext es para hacer disponible ese context, osea ese PacientesProvider y le pasamos el context al cual queremos acceder para extraer los valores
}

export default usePacientes;