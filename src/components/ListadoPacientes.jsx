import usePacientes from '../hooks/usePacientes'; // Para sacar los datos del state
import Paciente from './Paciente';

const ListadoPacientes = () => {

  const { pacientes } = usePacientes() // Recordemos que ese state retorna un objeto, por eso abrimos llaves y extraemos esos pacientes. Si tenemos una colección tenemos que crear otro componente y mostrar esos resultados. Como en este caso, pacientes es la colección y el componente que creamos para mostrar esos pacientes o resultados es en Paciente.jsx

  return (

    <>
      { pacientes.length ? (
        <> 
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map((paciente) => ( // Cuando estemos iterando en este arreglo requerimos de un key que sea único, y gracias a MongoDb que es una base de datos real nos lo traemos de allá
            <Paciente 
                key={paciente._id} // Nos traemos ese key o id del paciente
                paciente={paciente} // Le pasamos el objeto completo
            />
          ))}
          
        </>
      ) : (
        <> 
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
  
        </> 
      )}
    </>
  )
};

export default ListadoPacientes;