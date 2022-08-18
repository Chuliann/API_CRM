import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        const conseguirClienteApi = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                setCargando(false);
            }, 800);
        }

        conseguirClienteApi();
    }, [])

    return (

        cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
            <div>
                <h1 className='font-black text-4xl text-blue-900 '>Ver Cliente</h1>
                <p className='mt-3'>Informacion del cliente</p>

                <p className="text-gray-700 text-4xl mt-10">
                    <span className="text-gray-800 first-line:uppercase font-bold">Cliente: </span>
                    {cliente.nombre}
                </p>
                <p className="text-gray-700 text-2xl mt-4">
                    <span className="text-gray-800 first-line:uppercase font-bold">Email: </span>
                    {cliente.email}
                </p>
                {cliente.telefono && (
                    <p className="text-gray-700 text-2xl mt-4">
                        <span className="text-gray-800 first-line:uppercase font-bold">Teléfono: </span>
                        {cliente.telefono}
                    </p>
                )}
                <p className="text-gray-700 text-2xl mt-4">
                    <span className="text-gray-800 first-line:uppercase font-bold">Empresa: </span>
                    {cliente.empresa}
                </p>
                {cliente.notas && (
                    <p className="text-gray-700 text-2xl mt-4">
                        <span className="text-gray-800 first-line:uppercase font-bold">Notas: </span>
                        {cliente.notas}
                    </p>
                )}


            </div>
        )


    )
}

export default VerCliente