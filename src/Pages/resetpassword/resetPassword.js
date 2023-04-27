import React from 'react'
import { useState } from 'react'
import Background from '../../Components/background/Background'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import queryString from 'query-string';
import Loader from '../../Components/Loader/Loader'

const ResetPassword = () => {
    let params = queryString.parse(window.location.search)
    
    const [erroe,setError] = useState()
    const [result,setResult] = useState()
    const [password,setPassword] = useState()
const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

  const handleClick = async(e) =>{
    e.preventDefault()
    try{
      setLoading(true)
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/admin/resetPassword`,{password:password,...params})
      setLoading(false)
      setResult(resp.data)
      setError(null)
      setTimeout(function() {window.close();}, 3000)
      
    }
    catch(err){
      setLoading(false)
      setError(err.response.data.message)
      setResult(null)
      setTimeout(function() {window.close();}, 3000)
    }
    
  }
  return (
    <div className='forgotPassword'>
      <Background/>
      {loading && <Loader/>}
      <form action='/' className='loginForm'>
        <label for="username">Password</label>
        <input type="password" placeholder="Enter Password" id="username" onChange={(e)=>{setPassword(e.target.value)}}/>
        <div style={{width:'100%',justifyContent:'center','alignItems':'center',display:'flex',marginTop:'15px'}}>{erroe}</div>
        <div style={{width:'100%',justifyContent:'center','alignItems':'center',display:'flex',marginTop:'15px'}}>{result}</div>
        
        <button onClick={handleClick}>Reset Password</button>
    </form>
    </div>
  )
}

export default ResetPassword
