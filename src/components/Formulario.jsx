import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate();

    const NuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
        email: Yup.string().required("El email es obligatorio")
            .email("Email no valido"),
        telefono: Yup.number().typeError("Tiene que ser un numero valido")
            .integer("Numero no valido")
            .positive("Numero no valido"),
        notas: ""
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta;
            if (cliente.id) {
                const {id} = cliente;
                const url = `http://localhost:4000/clientes/${id}`;

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
            } else {
                const url = 'http://localhost:4000/clientes';

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            await respuesta.json();

        } catch (error) {
            console.log(error);
        }
    }


    return (

        cargando ? <Spinner /> : (

            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>

                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? "Editar Cliente" : 'Agregar Cliente'}</h1>

                <Formik
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        navigate("/clientes");
                        resetForm();
                    }}
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? ""
                    }}
                    enableReinitialize={true}
                    validationSchema={NuevoClienteSchema}
                >
                    {({ errors, touched }) => {
                        return (

                            <Form
                                className='mt-10'
                            >
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='nombre'
                                    >Nombre:</label>
                                    <Field
                                        type="text"
                                        id='nombre'
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='empresa'
                                    >Empresa:</label>
                                    <Field
                                        type="text"
                                        id='empresa'
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Empresa del Cliente"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >E-mail:</label>
                                    <Field
                                        type="email"
                                        id='email'
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Email del Cliente"
                                        name="email"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='telefono'
                                    >Telefono:</label>
                                    <Field
                                        type="tel"
                                        id='telefono'
                                        className="mt-2 block w-full p-3 bg-gray-100"
                                        placeholder="Telefono del Cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='notas'
                                    >Notas:</label>
                                    <Field
                                        as='textarea'
                                        type="text"
                                        id='notas'
                                        className="mt-2 block w-full p-3 bg-gray-100 h-40"
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? "Editar Cliente" : 'Agregar Cliente'}
                                    className='hover:cursor-pointer mt-5 w-full bg-blue-800 p-3 rounded-md text-white text-lg uppercase font-bold'
                                />
                            </Form>
                        )
                    }
                    }
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario