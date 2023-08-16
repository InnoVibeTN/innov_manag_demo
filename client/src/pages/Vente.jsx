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
        import.meta.env.VITE_SERVER_ADRESS + `/api/ventes/delete/${mat}`,
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

        <div className='flex flex-col'>
          <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-left text-sm md:text-md font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Ref
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Prix total(TND)
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Prix Donnée(TND)
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Client
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Vendeur
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Date
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Statue
                      </th>
                      <th scope='col' className='px-2 md:px-6 py-2 md:py-4'>
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
