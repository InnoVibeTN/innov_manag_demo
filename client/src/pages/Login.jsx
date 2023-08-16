import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  async function handleLogin() {
    event.preventDefault()
    //fetching api
    try {
      var { data } = await axios.post(
        import.meta.env.VITE_SERVER_ADRESS + '/api/utilisateurs/login',
        { nom: username, mdp: password }
      )
      console.log(data)
    } catch (err) {
      console.log(err)
    }
    if (data.status == 'ok') {
      navigate(`/utilisateur`)

      localStorage.setItem('user', data.data.nom)
      localStorage.setItem('role', data.data.role)
      localStorage.setItem('token', data.data.token)
      //token
      toast.success('Welcome Back', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast.warn('username ou mot de passe incorrect!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      <form className=' p-5 w-[80%] absolute top-[48%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center gap-6 lg:w-[30%]'>
        <div className='bg-third rounded-full overflow-hidden shadow-md w-[150px] h-[150px] '></div>
        <input
          type='text'
          className='rounded-md w-[70%] p-2 flex justify-center placeholder:text-lg placeholder:text-primary font-semibold shadow-sm text-center'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          className='rounded-md w-[70%] p-2 flex justify-center placeholder:text-lg placeholder:text-primary font-semibold shadow-sm text-center'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='border px-7 py-2 rounded-3xl text-primary bg-secondary text-lg font-semibold shadow-sm hover:bg-opacity-80 transition-all lg:px-10'
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </>
  )
}

export default Login
