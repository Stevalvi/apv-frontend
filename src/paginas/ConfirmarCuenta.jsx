import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // UseParams permite leer los parámetros de la url: confirmar/:id del archivo App.jsx}
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false); // Por defecto la cuenta no va a estar confirmada por eso le ponemos el false, se comprueba una vez que el usuario ha comprobado el email y ahi su valor cambia a true
  const [cargando, setCargando ] = useState(true); // Va a esperar mientras se cargan los usuarios para darnos una respuesta del usuario en específico. una vez se haya encontrado y nos dé una respiesta, cambia su valor a false.
  const [alerta, setAlerta] = useState(); // Se va a llenar con los resultados de los dos llamados del try catch de abajo.

  const params = useParams(); // En el caso de request en el backend usamos req.params, en el caso de react es useParams
  const { id } = params;

  useEffect(() => { // Para que ejecute un código una vez est'e listo
    const ConfirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}` // Le pasamos la url de nuestro backend donde vamos a hacer la petición para confirmar el email
        const { data } = await clienteAxios(url) // data es la respuesta que axios siempre nos va a dar, por eso la extraemos. axios por defecto tiene el método .get por eso no se lo especificamos
        setCuentaConfirmada(true) // Si se ejecuta el código del data con axios significa que si se pudo verificar correctamente y la cuenta confirmada pasa a ser true, caso contrario, se ejecuta el catch
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        }) // Nuestro componente de alerta de forma condicional revisa este error
      }

      setCargando(false); // Cambia a false una vez haya realizado todo lo de arriba
    }
    ConfirmarCuenta();
  }, []);


    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Confirma tu Cuenta y Comienza a Administrar {""}
                <span className="text-black">tus Pacientes</span>
            </h1>
        </div> 

        <div className='mt-20 md:mt-5 shadow:lg px-5 py-10 rounded-lg bg-white'> 

          {!cargando &&  
            <Alerta 
              alerta={alerta}
            />}

          {cuentaConfirmada && (
            <Link
              className='block text-center my-5 text-gray-500'
              to='/'>Iniciar Sesión</Link>
          )}
        </div> 
      </> // Le decimos cuando ya no esté cargando, muestra esa alerta: {!cargando &&  <Alerta 
        //   alerta={alerta}
        //  />}
    )
  }
  
  export default ConfirmarCuenta;