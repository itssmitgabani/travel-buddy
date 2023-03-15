import axios from 'axios';
import React, { useContext, useState } from 'react'
import './Feedback.scss'
import {AuthContext} from '../../context/AuthContext.js'

const Feedback = () => {
  const {user} = useContext(AuthContext)
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault()
try{
  const newData = {
    ...info,
    u_id : user._id
  }
  await axios.post('/feedback/create',newData)
  alert("thanks")
  window.location.reload()
}
catch(err){
  setError(true)
}  
  }

  return (
    <div>
      <form className='form2'> 
      <h1 style={{color:'gray',padding:'20px',marginTop:'20px',textAlign:'center'}}>Feedback Form :</h1>     
      Feedback For :
  <span class="feedback-input" style={{display:'flex',justifyContent:'center',gap:'20px'}}>
    
  <input type="radio" value="Hotel" name="gender" id='for'onChange={handleChange}/> Hotel
        <input type="radio" value="Airline" name="gender" id='for'onChange={handleChange}/> Airline
        <input type="radio" value="WebSite" name="gender" id='for'onChange={handleChange}/> WebSite

    </span>
  <textarea name="text" class="feedback-input" placeholder="feedback" id="feedback" onChange={handleChange}></textarea>
  {error && <span style={{color:'red','marginBottom':"15px",display:'inline-block',textAlign:'center','width':'100%'}}>All Fields Required</span>}
  <input type="submit" value="SUBMIT" onClick={handleClick}/>
</form>
    </div>
  )
}

export default Feedback
