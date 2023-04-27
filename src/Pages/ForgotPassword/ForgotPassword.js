import axios from 'axios'
import { useState } from 'react'
import './ForgotPassword.scss'
import Loader from '../../Components/Loader/Loader'
import {useNavigate} from 'react-router-dom'

const ForgotPassword = () => {
const [email,setEmail] = useState()
const [erroe,setError] = useState()
const [result,setResult] = useState()
const [loading,setLoading] = useState(false)

const navigate = useNavigate()
  const handleClick = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/user/forgotPassword`,{email:email})
      setResult(resp.data)
      setError(null)
      setLoading(false)
      
    setTimeout(function() {navigate('/login');}, 3000)
    }
    catch(err){
      setLoading(false)
      setError(err.response.data.message)
      
    }
    
  }
  return (
    <div className='fPasswordContainer'>
    {loading && <Loader/>}
    <div class="container" id="container">
      
      <div class="form-container sign-in-container">
        <form action="/" className='form1'>
          <h1 className='h1'>Forgot Password</h1>
          <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} />
          {erroe}{result}
          <button className='btn1'style={{cursor:'pointer'}} onClick={handleClick}>send link</button>
        </form>
      </div>
    </div>
    
        </div>
  )
}

export default ForgotPassword
