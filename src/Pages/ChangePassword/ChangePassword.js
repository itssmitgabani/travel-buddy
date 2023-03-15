import './ChangePassword.scss'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  
  const [error,setError] = useState(null);

  const navigate = useNavigate();
  const {user,dispatch } = useContext(AuthContext);

  const handleUpdatePassword = async e => {
    e.preventDefault()
    try{

      const passwords = {
        oldpassword:document.getElementById("oldpassword").value,
        newpassword:document.getElementById("newpassword").value,
        Cpassword:document.getElementById("Cpassword").value,
      }


      await axios.put(`/airlines/updatePassword/${user._id}`,passwords)
      setError(null)
      alert("you need to re-login")
      
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    }catch(err){
      setError(err.response.data.message)
    }
  };
  return (
    <div className='changePasswordContainer'>
      <h1>Change Password:</h1>

      <div className='Container'>
          <input type="text" placeholder='old password' id="oldpassword"/>
          <input type="text" placeholder='new password' id="newpassword"/>
          <input type="text" placeholder='confirm new password' id="Cpassword"/>

          {error && <span>{error}</span>}
          <button onClick={handleUpdatePassword}>Save</button>
      </div>
    </div>
  )
}

export default ChangePassword
