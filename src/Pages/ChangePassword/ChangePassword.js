import './ChangePassword.scss'
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import * as React from 'react';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ChangePassword = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    
  };
  
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);

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


      await axios.put(`${process.env.REACT_APP_BASE_URL}/airlines/updatePassword/${user._id}`,passwords)
      setError(null)
      setLoading(false)
      handleClickOpen()
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
      <Dialog
    style={{zIndex:1500}}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign={'center'}><NewReleasesRoundedIcon style={{width:'80px','height':'80px',color:'crimson'}}/></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{textAlign:'center',color:'black'}}>
            You need to re-login!
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}} >
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ChangePassword
