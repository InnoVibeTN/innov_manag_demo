import React from 'react'
import { RiBillLine } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import { MdOutlineDone } from 'react-icons/md'
import axios from 'axios'
function Vent(props) {
  const vente = props.vente
  console.log(vente)
  const [status, setStatus] = React.useState(vente.statue)
  const [donnee, setDonnee] = React.useState(String(vente.prix_donnee))
  const [mod, setMod] = React.useState(false)
  async function updateGivenPrice() {
    setMod(false)
    setDonnee(eval(donnee))
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/ventes/modifyGivenPrice/${vente.id_v}`,
        {
          prix_donnee: eval(donnee),
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  async function changeStatus() {
    const newStatus = status === 0 ? 1 : 0
    setStatus(newStatus)
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/ventes/modifyStatus/${vente.id_v}`,
        {
          status: newStatus,
        },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <tr
      className={`border-b ${
        vente.prix_tot == donnee ? 'bg-secondary' : ''
      }	 dark:border-neutral-500`}
    >
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.id_v}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.prix_tot}TND
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        <input
          className='inpt  w-14  max-w-[70px]   '
          type='text'
          value={donnee}
          onChange={(e) => {
            setDonnee(e.target.value)

            setMod(true)
          }}
        />
        {mod && (
          <button
            className='bg-forth  text-third ml-2 border rounded-md  px-2'
            onClick={updateGivenPrice}
          >
            <MdOutlineDone />
          </button>
        )}
        {!mod && 'TND'}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.nomClient}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.nomUtilisateur}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {vente.date_v.split('T')[0] +
          ' ' +
          vente.date_v.split('T')[1].substring(0, 5)}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4'>
        {localStorage.getItem('role') === 'admin' && (
          <div
            className={`w-4 h-4 md:w-5 md:h-5 ${
              status === 0 ? 'bg-signM' : 'bg-signP'
            } rounded-full cursor-pointer`}
            onClick={changeStatus}
          ></div>
        )}
      </td>
      <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4 flex justify-center items-center'>
        {' '}
        <RiBillLine
          className='cursor-pointer text-xl'
          onClick={() => props.prepareLabelPopup(props.vente)}
        />
        <td className='whitespace-nowrap px-2 md:px-6 py-2 md:py-4 flex justify-center items-center'>
          {' '}
          {localStorage.getItem('role') === 'admin' && (
            <FaTrash
              className='cursor-pointer text-signM text-xl hover:opacity-80'
              onClick={() => props.deleteVente(vente.id_v)}
            />
          )}
        </td>
      </td>
    </tr>
  )
}

export default Vent
