import React from 'react'
import Layout from './../Layout'
import { AiFillPlusCircle } from 'react-icons/ai'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Vent from '../components/Vent'
import AddVente from '../components/AddVente'
import VenteLabel from '../components/VenteLabel'
import axios from 'axios'
import { RiBillLine } from 'react-icons/ri'
import { FaTrash } from 'react-icons/fa'
import { MdOutlineDone } from 'react-icons/md'
function Vente() {
  const [addVentePopUp, setAddVentePopup] = React.useState(false)
  const [addLabelVentePopUp, setAddLabelVentePopup] = React.useState(false)
  const [labelVenteData, setLabelVenteData] = React.useState({})
  const [ventes, setVentes] = React.useState([])
  async function deleteVente(mat) {
    try {
      var { data } = await axios.delete(
        `http://localhost:5000/api/ventes/delete/${mat}`,
        { headers: { token: localStorage.getItem('token') } }
      )
    } catch (err) {
      console.log(err)
    }

    if (data.status === 'ok') {
      const filteredVentes = ventes.filter((vente) => mat !== vente.id_v)
      setVentes(filteredVentes)
      toast.success('vente a été retirer avec succées', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast.error('probleme de retirer cette vente!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }
  function prepareLabelPopup(data) {
    setLabelVenteData(data)
    setAddLabelVentePopup(true)
  }
  async function getVentes() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_ADRESS + '/api/ventes/getAll',
        { headers: { token: localStorage.getItem('token') } }
      )
      setVentes(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    getVentes()
  }, [])
  return (
    <Layout>
      <div className='relative  bg-third p-2 w-[100%] h-[90vh] rounded-3xl lg:h-[80vh]  lg:w-[73%]   lg:py-5 overflow-y-scroll	shadow-xl'>
        {/*HEADER*/}
        <h2 className='text-center text-2xl font-bold text-forth '>Ventes</h2>
        {(localStorage.getItem('role') === 'admin' ||
          localStorage.getItem('role') === 'vendeur') && (
          <AiFillPlusCircle
            className='text-3xl  text-primary rounded-full cursor-pointer bg-third shadow-md absolute right-5 top-5  md:block '
            onClick={() => setAddVentePopup(true)}
          />
        )}
        {/*Ventes*/}
        <div className='prods mt-7 flex flex-col justify-center items-center gap-3  '>
          <div className=' relative bg-forth p-2 rounded-md text-third text-md  flex w-[100%]  gap-5 md:gap-0 md:justify-between   md:items-str md:text-[11px] lg:w-[95%]  '>
            <div className='flex flex-col md:items-center gap-2   md:flex-row lg:gap-5'>
              <p>Ref</p>
              <p>Prix total(TND)</p>
              <p>Prix Donnée(TND)</p>
            </div>
            <div className='flex  items-center justify-end gap-3  grow  md:justify-end   md:gap-2 lg:gap-5'>
              <div className='flex items-center gap-3 md:gap-2 lg:gap-5'>
                <p>Client</p>
                <p>Date</p>
                {localStorage.getItem('role') === 'admin' && <p>Statue</p>}
              </div>

              <div className='flex items-center gap-5 md:gap-2 lg:gap-5'>
                <RiBillLine className='cursor-pointer text-xl' />
                {localStorage.getItem('role') === 'admin' && (
                  <FaTrash className='cursor-pointer hover:opacity-80' />
                )}
              </div>
            </div>
          </div>
          {ventes.map((vente, index) => {
            if (vente.statue === 1) {
              return (
                <Vent
                  key={index}
                  prepareLabelPopup={prepareLabelPopup}
                  vente={{ ...vente }}
                  deleteVente={deleteVente}
                />
              )
            }
            if (
              vente.statue === 0 &&
              (localStorage.getItem('role') === 'admin' ||
                localStorage.getItem('role') === 'comptable')
            ) {
              return (
                <Vent
                  key={index}
                  prepareLabelPopup={prepareLabelPopup}
                  vente={{ ...vente }}
                  deleteVente={deleteVente}
                />
              )
            }
            return null
          })}
        </div>
      </div>
      {/*NOTIFICATION*/}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      {/* ADD Vente POP UP */}
      {addVentePopUp && (
        <AddVente
          setAddVentePopup={setAddVentePopup}
          setVentes={setVentes}
          ventes={ventes}
          toast={toast}
        />
      )}
      {addLabelVentePopUp && (
        <VenteLabel
          labelVenteData={labelVenteData}
          setAddLabelVentePopup={setAddLabelVentePopup}
        />
      )}
    </Layout>
  )
}
export default Vente
