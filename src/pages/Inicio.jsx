import React, { useState, useEffect } from 'react'
import Cliente from "../components/Cliente"
import Confirmar from "../components/Confirmar"

const Inicio = () => {

  const [clientes, setClientes] = useState([]);
  const [confirmar, setConfirmar] = useState(false);
  const [borrar, setBorrar] = useState(false);

  const handleEliminar = async id => {
    setConfirmar(true);

    if (borrar) {
      setConfirmar(false);
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE"
        })
        await respuesta.json()

        const arregloClientes = clientes.filter(cliente => cliente.id !== id);
        setClientes(arregloClientes);


      } catch (error) {
        console.log(error);
      }

    }
  }


  useEffect(() => {

    const obtenerClientesApi = async () => {
      try {
        const url =import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    }
    obtenerClientesApi();
  }, [])

  return (
    <>
      {confirmar ? <Confirmar setBorrar={setBorrar} setConfirmar={setConfirmar} confirmar={confirmar} /> : null}
      <h1 className='font-black text-4xl text-blue-900 '>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>

      <table className='w-full mt-5 table-auto shadow bg-white'>
        <thead className='bg-blue-800 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inicio