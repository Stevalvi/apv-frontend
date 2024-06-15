import { useState } from 'react';
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => { // Creamos un state por cada uno de los campos

  // Lo del lado izquierdo es el valor, osea la variable y la del lado derecho es el método o función que modifica el state, osea nombre, email, password, etc.
    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
      e.preventDefault();

      if([nombre, email, password, repetirPassword].includes('')) {
        setAlerta({ msg: 'Hay campos vacíos', error: true}); // Le pasamos la alerta y toma dos valores, el mensaje y el tipo
        return;
      }

      if(password !== repetirPassword) {
        setAlerta({ msg: 'Los Password no son iguales', error: true}); // Le pasamos la alerta y toma dos valores, el mensaje y el tipo
        return;
      }

      if(password.length < 6) {
        setAlerta({ msg: 'El Password es muy corto, agrega mínimo 6 caracteres', error: true}); // Le pasamos la alerta y toma dos valores, el mensaje y el tipo
        return;
      }

      setAlerta({}) // Para que una vez que se pasó la validación del formulario desaparezca la alerta de error, por eso se deja como un objeto vacío.

      // Crear el usuario en la api
      try {
         // Aquí es donde enviaremos nuestra petición, es la url de la base de datos, la sacamos del url de postman donde hicimos lo del backend.
        await clienteAxios.post('/veterinarios', { nombre, email, password }) // El default de axios es get(), pero en este caso le especificamos que es una petición post. Este toma tres valores, el primero es la url, el segundo los datos que vamos a enviar y el tercero la configuración de axios que puede ser la autorización prover.
        setAlerta({
            msg: 'Creado Correctamente, revisa tu email', error: false
        })
      } catch (error) { // Accedemos al error del backend que dice usuario ya registrado para conectarlo al frontend y mostrarlo en pantalla.
        setAlerta({
            msg: error.response.data.msg,
            error: true
        })
      }
    }

    const { msg } = alerta;

// Agregamos el componente de alerta antes del form con: { msg && <Alerta 
            // alerta={alerta}
            // />} para que muestra las alertas antes del formulario

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl px-11">
                Crea tu Cuenta y Administra {""}
                <span className="text-black">tus Pacientes</span>
            </h1>
        </div> 

        <div className='mt-20 md:mt-5 shadow:lg px-5 py-10 rounded-lg bg-white mx-10'> 

          { msg && <Alerta 
            alerta={alerta}
          />} 
    
            <form
              onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    <input 
                        type="text"
                        placeholder="Tu Nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)} // Lo que vayamos escribiendo en el input se irá guardando en el state
                    />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="email"
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Repite tu Password"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repetirPassword}
                        onChange={ e => setRepetirPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value= "Crear Cuenta"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>  

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link
                    className='block text-center my-5 text-gray-500'
                    to='/'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link 
                    className='block text-center my-5 text-gray-500' 
                    to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default Registrar;