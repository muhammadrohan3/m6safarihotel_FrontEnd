import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from './Message'
import Loader from './Loader'
import logo from '../assets/logo.png'
import axios from '../utils/axios'
import {useDispatch} from 'react-redux'
function Login() {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const dispatch = useDispatch()  
  useEffect(() => {
    if (localStorage.getItem('access_token') && Number(localStorage.getItem('expires_at')) > new Date().getTime()) {
      setLoader(false)
      navigate('/')
    }
    setLoader(false)
  }, [])
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [message, setMessage] = useState({ type: "", message: "" })
  const handleLogin = () => {
    if (credentials.email === "" || credentials.password === "") {
      setMessage({ type: "error", message: "Please fill all the fields" })
      return;
    }
    if (credentials.password.length < 8) {
      setMessage({ type: "error", message: "Wrong email or password" })
      return;
    }
    setLoader(true)
    axios.post('/users/signin', credentials)
        .then(res => {
            console.log(res)
            localStorage.setItem('access_token', res.data.token)
            localStorage.setItem('expires_at', new Date().getTime() + 86400000)
            dispatch({type : "LOGIN", payload : res.data.user})
            setLoader(false)
            navigate('/')
            })
        .catch(err => {
            console.log(err)
            setLoader(false)
            setMessage({ type: "error", message: err.response.data.msg })
        })
  }

  return (
    <div className='w-full bg-slate-200 h-screen flex flex-col justify-start items-center gap-4'>
        <img src={logo} alt="" className='w-[200px]' />
      {/* <Message type={message.type} message={message.message} setMessage={setMessage} /> */}
      {
        loader ? <Loader /> :
          <div className='w-[350px] bg-white border rounded-2xl flex flex-col items-center p-5'>
            <h1 className='text-xl py-5'>Login</h1>
            <div className='w-full flex flex-col items-center'>
              <div className='w-full flex flex-col'>
                <label htmlFor="">Email</label>
                <input className='w-full my-3 border border-gray-400 rounded-lg px-2 h-9' type="email" placeholder='Enter Email here' value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
              </div>
              <div className='w-full flex flex-col'>
                <label htmlFor="">Password</label>
                <input className='w-full my-3 border border-gray-400 rounded-lg px-2 h-9' type="password" placeholder='Enter password here' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
              </div>
              {/* <p className='text-sm text-left w-full '>Forget your password ? <span className='text-blue-600 cursor-pointer hover:underline underline-offset-1' onClick={() => { navigate("/reset-password") }} >Reset password</span></p> */}
              <button className='h-8 px-3 bg-base border border-base hover:bg-white hover:text-base text-white rounded-full my-3' onClick={handleLogin} >Login</button>
              {/* <p className='text-sm text-center w-full '>Don't have an account ? <span className='text-blue-600 cursor-pointer hover:underline underline-offset-1' onClick={() => { navigate("/register") }} >create new</span></p> */}
            </div>
          </div>
      }
    </div>
  )
}

export default Login