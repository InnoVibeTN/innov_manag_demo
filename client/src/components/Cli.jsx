import React from 'react'

import { LuEdit3 } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { FaTrash } from 'react-icons/fa'
function Cli({ client, deleteClient }) {
  return (
    <div className=' relative bg-forth p-2 rounded-md text-third text-sm  flex w-[100%]  gap-5 md:gap-0 md:justify-between   md:items-center md:text-lg lg:w-[90%]  '>
      <div className='flex flex-col md:items-center gap-2 md:flex-1  md:flex-row lg:gap-5 '>
        <p>{client.nom}</p>
      </div>
      <div className='flex  items-center justify-between  grow  md:justify-between   md:gap-2 lg:gap-5'>
        <div className='flex items-center gap-3 md:gap-2 lg:gap-5'>
          <p>Tel: {client.tel}</p>
        </div>

        <div className='flex items-center gap-5 md:gap-2 lg:gap-5'>
          <Link to={String(client.id)}>
            <LuEdit3 className='cursor-pointer hover:opacity-80' />
          </Link>
          <FaTrash
            className='cursor-pointer hover:opacity-80'
            onClick={() => deleteClient(client.id)}
          />
        </div>
      </div>
    </div>
  )
}

export default Cli
