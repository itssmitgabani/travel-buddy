import React from 'react'
import { useState } from 'react'
import Background from '../../Components/background/Background'
import Container from '../../Components/container/Container'
import './ForgotPassword.scss'
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'

const ForgotPassword = () => {
  const [email,setEmail] = useState()
const [erroe,setError] = useState()
const [result,setResult] = useState()
const [loading,setLoading] = useState(false)

  const handleClick = async(e) =>{
    e.preventDefault()
    try{
      setLoading(true)
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/admin/forgotPassword`,{email:email})
      setLoading(false)
      setResult(resp.data)
      setError(null)
    }
    catch(err){
      setLoading(false)
      setError(err.response.data.message)
      
    }
    
  }
  return (
    <div className='forgotPassword'>
      <Background/>
      {loading && <Loader/>}
      <form action='/' className='loginForm'>
        <label for="username">Email</label>
        <input type="email" placeholder="Enter Email" id="username"onChange={(e)=>{setEmail(e.target.value)}}/>
        <div style={{width:'100%',justifyContent:'center','alignItems':'center',display:'flex',marginTop:'15px'}}>{erroe}</div>
        <div style={{width:'100%',justifyContent:'center','alignItems':'center',display:'flex',marginTop:'15px'}}>{result}</div>
        <button onClick={handleClick}>Send Link</button>
    </form>
    </div>
  )
}

export default ForgotPassword
