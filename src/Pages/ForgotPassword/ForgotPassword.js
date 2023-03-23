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
      const resp = await axios.post('/auth/hotel/forgotPassword',{email:email})
      setResult(resp.data)
      setError(null)
      setLoading(false)
    }
    catch(err){
      setLoading(false)
      setError(err.response.data.message)
      
    }
    
  }

  return (
    <div className='forgotPassword'>
      { loading && <Loader/>}
      <form action='/' className='loginForm'>

        <label for="username">Email</label>
        <input type="text" placeholder="Enter Email" id="username" onChange={(e)=>{setEmail(e.target.value)}}/>
        {erroe}{result}
        <button onClick={handleClick}>Send Link</button>
    </form>
    </div>
  )
}

export default ForgotPassword
