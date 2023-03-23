import './ChangePassword.scss'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';

const ChangePassword = () => {
  
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const {user,dispatch } = useContext(AuthContext);

  const handleUpdatePassword = async e => {
    e.preventDefault()
    setLoading(true)
    try{

      const passwords = {
        oldpassword:document.getElementById("oldpassword").value,
        newpassword:document.getElementById("newpassword").value,
        Cpassword:document.getElementById("Cpassword").value,
      }


      await axios.put(`/airlines/updatePassword/${user._id}`,passwords)
      setError(null)
      setLoading(false)
      alert("you need to re-login")
      
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    }catch(err){
      setLoading(false)
      setError(err.response.data.message)
    }
  };
  return (
    <div className='changePasswordContainer'>
      {loading && <Loader/> }
      <h1>Change Password:</h1>

      <div className='Container'>
          <input type="password" placeholder='old password' id="oldpassword"/>
          <input type="password" placeholder='new password' id="newpassword"/>
          <input type="password" placeholder='confirm new password' id="Cpassword"/>

          {error && <div style={{display:'flex',justifyContent:'center'}}><span>{error}</span></div>}
          <button onClick={handleUpdatePassword}>Save</button>
      </div>
    </div>
  )
}

export default ChangePassword
