import axios from 'axios'
import React, { useState } from 'react'
import queryString from 'query-string';
import Loader from '../../Components/Loader/Loader'

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
    const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/airline/resetPassword`,{password:password,...params})
    setResult(resp.data)
    setError(null)
    setLoading(false)
    setTimeout(function() {window.close();}, 3000)
  }
  catch(err){
    setError(err.response.data.message)
    setResult(null)
    setLoading(false)
  }
  
}
  return (
    <div className='forgotPassword'>
      { loading && <Loader/>}
      <form action='/' className='loginForm'>

        <label for="username">Reset Password</label>
        <input type="password" placeholder="Enter Password" id="username" onChange={(e)=>{setPassword(e.target.value)}}/>
        {erroe}{result}
        <button onClick={handleClick}>Reset Password</button>
    </form>
    </div>
  )
}

export default PasswordReset
