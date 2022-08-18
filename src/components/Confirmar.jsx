
const Confirmar = ({setBorrar, setConfirmar, confirmar}) => {
  return (
    <div className={`transition-all ease-in duration-300 bg-white top-2/4 -translate-y-1/2 md:h-1/4 rounded-md shadow-md md:w-2/4 opacity-0 ${confirmar ? "fixed scale-110 opacity-100" : ""} `}>
        <p className="text-center text-3xl font-bold">Seguro?</p>
        <button 
            onClick={() => setBorrar(true)}
        >Si</button>
        <button 
            onClick={() => setConfirmar(false)}
        >No</button>
    </div>
  )
}

export default Confirmar