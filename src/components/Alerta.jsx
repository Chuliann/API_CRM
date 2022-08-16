import React from 'react'

const Alerta = ({children}) => {
    return (
        <div className='text-center bg-red-600 text-white font-bold p-2 my-4 uppercase'>
            {children}
        </div>
    )
}

export default Alerta