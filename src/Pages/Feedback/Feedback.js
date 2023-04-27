import axios from 'axios';
import React, { useContext, useState } from 'react'
import './Feedback.scss'
import {AuthContext} from '../../context/AuthContext.js'
import Loader from '../../Components/Loader/Loader';import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Feedback = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick1 = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    

    setOpen(false);
  };
  const {user} = useContext(AuthContext)
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault()
    setLoading(true)
try{
  const newData = {
    ...info,
    u_id : user._id
  }
  await axios.post(`${process.env.REACT_APP_BASE_URL}/feedback/create`,newData)
  setLoading(false)
  handleClick1()
  
  setTimeout(function() {window.location.reload();}, 2000)
}
catch(err){
  setLoading(false)
  setError(true)
}  
  }

  return (
    <div>
      {loading && <Loader/>}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Thanks for sharing your Feedback
        </Alert>
      </Snackbar>
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
