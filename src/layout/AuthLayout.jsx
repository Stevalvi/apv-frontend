import { Outlet } from 'react-router-dom'; // Ese outlet va a permitir inyectar y mostrar lo que agreguemos en las rutas que son hijas de este Layout que es la route padre.

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
            <Outlet />
        </main>

    </>
  )
};

export default AuthLayout;