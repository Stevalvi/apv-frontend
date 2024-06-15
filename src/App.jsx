import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importamos 3 paquetes de esa libreria. Todo debe ir dentro del BrowserRouter, ese Routes permite  agrupar diferentes rutas. Y Route es para una ruta en específico.

// Ese path es la página que se va a cargar una vez visitemos esa página, osea es la principal
import AuthLayout from './layout/AuthLayout'; // Cuando el usuario visite la diagonal '/', se va a cargar el <AuthLayout />
import RutaProtegida from './layout/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import AdministrarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';

import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

// Ese Route que contiene el AuthLayout es el padre que contiene las rutas hijas que le asignemos. El index le va a decir que ese login es el primer componente.
// <Route path='/' element={<AuthLayout />}>
/* <Route exact element={<Login />} />
</Route> */

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes> 
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path='perfil' element={<EditarPerfil />} />
              <Route path='cambiar-password' element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
