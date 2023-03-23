import './ContactUs.scss'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'
const ContactUs = () => {

  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault()
try{
  setLoading(true)
  await axios.post('/contact/create',info)
  setLoading(false)
  window.location.reload()
}
catch(err){
  setLoading(false)
  setError(true)
}  
  }

  return (
    <form class="form">{
      loading && <Loader/>
    }
  <h2>CONTACT US</h2>
  
  <p type="Name:" className='p'><input id="name" placeholder="Write your name here.." onChange={handleChange}></input></p>
  <p type="Email:"className='p'><input id="email" placeholder="Let us know how to contact you back.." onChange={handleChange}></input></p>
  <p type="Message:"className='p'><input id="message" placeholder="What would you like to tell us.." onChange={handleChange}></input></p>
  {error && <span style={{color:'red'}}>All Fields Required</span>}
  <button className='btnSend' onClick={handleClick}>Send Message</button>
  <div className='div1'>
    
  <span className='s1'><LocalPhoneIcon/></span>995 428 4148<br/>
    <span className='s1'><EmailIcon/></span>travelbuddy@gmail.com
  </div>
</form>
  
  )
}

export default ContactUs
