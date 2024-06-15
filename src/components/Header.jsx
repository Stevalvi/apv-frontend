import { Link } from "react-router-dom"; // Porque vamos a tener routing con Link
import useAuth from "../hooks/useAuth"; // Importamos useAuth para extraer esa función de cerrarSesion

const Header = () => {

    const { cerrarSesion } = useAuth()
  return (
    <header className="py-10 px-11 bg-indigo-600">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes de {''}
                <span className="text-white font-black">Veterinaria</span>
            </h1>

            <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
                <Link to='/admin' className="text-white text-sm uppercase font-bold">Pacientes</Link>
                <Link to='/admin/perfil' className="text-white text-sm uppercase font-bold">Perfil</Link>

                <button 
                    type="button"
                    className="text-white text-sm uppercase font-bold"
                    onClick={cerrarSesion} // Asignamos esa función para cerrar sesión
                >Cerrar Sesión</button>
            </nav>
        </div>
    </header>
  )
};

export default Header;
