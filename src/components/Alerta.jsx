const Alerta = ({alerta}) => { // Este va a tomar una alerta, que vamos a mostrar en mensaje para que los usuarios lo vean en pantalla
    return (
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}> 
            {alerta.msg}
        </div> // Si la alerta es de tipo error, se ejecuta ${alerta.error ? 'from-red-400 to-red-600' caso contrario : se ejecuta este color 'from-indigo-400 to-indigo-600'}  y para que funcione debemos agregarle el lineargradient con bg-gradient-to-br
    )
};

export default Alerta;