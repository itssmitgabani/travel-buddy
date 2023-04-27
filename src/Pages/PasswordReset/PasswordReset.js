import axios from 'axios'
import React, { useState } from 'react'
import './PasswordReset.scss'
import queryString from 'query-string';
import Loader from '../../Components/Loader/Loader';

const PasswordReset = () => {
    let params = queryString.parse(window.location.search)
    console.log(params)
    const [erroe,setError] = useState()
    const [result,setResult] = useState()
    const [password,setPassword] = useState()
    const [loading,setLoading] = useState(false)
    
  const handleClick = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/user/resetPassword`,{password:password,...params})
      setResult(resp.data)
      setError(null)
      setLoading(false)
      
    setTimeout(function() {window.close();}, 3000)
    }
    catch(err){
      setLoading(false)
      setError(err.response.data.message)
      setResult(null)
      
    }
    
  }
  return (
    <div className='fPasswordContainer'>
      {loading && <Loader/>}
    <div class="container" id="container">
      
      <div class="form-container sign-in-container">
        <form action="/" className='form1'>
          <h1 className='h1'>Reset Password</h1>
          <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
          {erroe}{result}
          <button className='btn1'  style={{cursor:'pointer'}}onClick={handleClick}>reset password</button>
        </form>
      </div>
    </div>
    
        </div>
  )
}

export default PasswordReset
