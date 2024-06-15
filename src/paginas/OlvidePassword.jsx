import { useState } from "react"; // Para colocar lo que el usuario ingrese y hacer algunas validaciones
import { Link } from "react-router-dom";
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios'; // Porque requerimos hacer un llamado hacia ese endpoint de olvide-contraseña

const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault()

        if(email === '' && email.length < 6) {
            setAlerta({msg: 'El Email es obligatorio', error: true})
            return
        }

        // Caso de que pase la validación de arriba
        try {
            const { data } = await clienteAxios.post('/veterinarios/olvide-password', {email}) // Le pasamos el email, va a leer la variable email y el valor, osea el correo de nuestra base de datos.
            setAlerta({msg: data.msg}) // Acá se manda el mensaje de hemos enviado un email con las instrucciones
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta // Eso se muestra en setAlerta

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl px-11">
                Recupera tu Acceso y no Pierdas {""}
                <span className="text-black">tus Pacientes</span>
            </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow:lg px-5 mx-10 py-10 rounded-lg bg-white'>

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
                        Email
                    </label>
                    <input 
                        type="email"
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value= "Enviar Instrucciones"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>  

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link
                    className='block text-center my-5 text-gray-500'
                    to='/registrar'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                <Link 
                    className='block text-center my-5 text-gray-500' 
                    to="/registrar">¿No tienes una cuenta? Regístrate</Link>
            </nav>
        </div>
      </>
    )
  }
  
  export default OlvidePassword;