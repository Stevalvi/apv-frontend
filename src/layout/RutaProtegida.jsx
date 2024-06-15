import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth() // Tenemos que mandar a llamar esa función de useAuth para que extraiga toda esa información que pertenece a ese context.
    if(cargando) return 'cargando...'

  return (
    <>
        <Header />
            {auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet /> 
                </main>
            ): <Navigate to='/' />} 
        <Footer />
    </>
  )
}; 

// Con navigate podemos proteger rutas, en este caso si auth tiene algo, osea que si el usuario pudo iniciar sesión mostramos el outlet, caso contrario, se ejecuta el navigate que no lo deja ingresar y envía el usuario a iniciar sesión

export default RutaProtegida;
