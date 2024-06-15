import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false) // Abajo se definió que para mostrar el formulario se ejecuta el block caso contrario para ocultarlo el hidden 
  return (
    <div className="flex flex-col md:flex-row mx-11">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)} // Toca usar un callback para agregarle el setMostrarFormulario(!mostrarFormulario) ya que toma un parámetro esa función. Con esto se muestra el formulario cuando demos click en el botón, pero por default estará oculto. Se usa ese !mostrarFormulario porque quiere decir que cuando esté en false cambia a true y cuando esté en true cambia a false, de esa forma se estará mostrando y ocultando 
      > {mostrarFormulario ? 'Ocultar Formulario': 'Mostrar Formulario'}</button>


      <div className={`${mostrarFormulario ? 'block': 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  );
};

export default AdministrarPacientes;