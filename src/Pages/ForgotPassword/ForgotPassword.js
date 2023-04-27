import './ForgotPassword.scss'
import axios from 'axios'
import { useState } from 'react'
import Loader from '../../Components/Loader/Loader'
const ForgotPassword = () => {
  const [email,setEmail] = useState()
const [erroe,setError] = useState()
const [result,setResult] = useState()
const [loading,setLoading] = useState(false)

  const handleClick = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try{
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/airline/forgotPassword`,{email:email})
      setResult(resp.data)
      setError(null)
      setLoading(false)
    }
    catch(err){
      setError(err.response.data.message)
      setLoading(false)
    }
    
  }

  return (
    <div className='forgotPassword'>
      { loading && <Loader/>}
      <form action='/' className='loginForm'>

        <label for="username">Email</label>
        <input type="text" placeholder="Enter Email" id="username" onChange={(e)=>{setEmail(e.target.value)}}/>
        
        <div style={{display:'flex',justifyContent:'center'}}><span>{erroe}{result}</span></div>
        <button onClick={handleClick}>Send Link</button>
    </form>
    </div>
  )
}

export default ForgotPassword
