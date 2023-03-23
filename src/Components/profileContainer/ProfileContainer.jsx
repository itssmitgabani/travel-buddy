import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useGridStatePersistence } from '@mui/x-data-grid/internals';
import React, { useContext, useState } from 'react';
import { Link, useActionData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './ProfileContainer.scss'
import axios from 'axios';
import Loader from '../Loader/Loader'

const ProfileContainer = () => {

  const navigate = useNavigate();
  const {dispatch } = useContext(AuthContext);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const {user} = useContext(AuthContext)
  const [name,setName] = useState(null);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [file,setFile] = useState(null);
  const [photoURL,setPhotoURL] = useState(user.img);
  const handleClickOpenEditProfile = () => {
    setOpenEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
  };
  const handleClickOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };
  const handleSetName = (e) => {
    setName(e.target.value)
  };

  const handleUpdateNameAndImg = async e => {
    setLoading(true)
    e.preventDefault()
    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","upload")
let url
    try{
      if(file !== null){
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dsdcdnhiv/image/upload",data)
      
        url = uploadRes.data
  
      }
      const updatedData = {
        username:name? name: user.username,
        img: (file !== null ? url.url : user.img),
      }


      await axios.put(`/admin/updateNameAndImg/${user._id}`,updatedData)
      
      const newData = await axios.get(`/admin/${user._id}`)
      localStorage.setItem("admin", JSON.stringify(newData.data.details));
      setLoading(false)
      handleCloseEditProfile()
    window.location.reload();
    }catch(err){
      setLoading(false)
      console.log(err)
    }
    
  };

  const handleUpdatePassword = async e => {
    setLoading(true)
    e.preventDefault()
    try{

      const passwords = {
        oldpassword:document.getElementById("oldpassword").value,
        newpassword:document.getElementById("newpassword").value,
        Cpassword:document.getElementById("Cpassword").value,
      }


      await axios.put(`/admin/updatePassword/${user._id}`,passwords)
      setLoading(false)
      setError(null)
      alert("you need to re-login")
      
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    }catch(err){
      setLoading(false)
      setError(err.response.data.message)
    }
    handleCloseEditProfile()
  };

  const handleChange = (e)=>{
    const file = e.target.files[0]
    if(file){
        setFile(file)
        setPhotoURL(URL.createObjectURL(file))
    }
  }

  

  const handleClick = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className='profileContainer'>
      {loading && <Loader/>}
      <div className="top">
            <h1>profile</h1>
        </div>
        <div className="bottom">
    
    <div className="profile">
        <div className="image">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <img src={user.img} width="70" height="70" alt="Jessica Potter"/>
        </div>
        
        <div className="name">{user && user.username}</div>
        
			<div className="job">{user && user.email}</div>
        
        <div className="actions">
            <button className="btn" onClick={handleClickOpenEditProfile} >Edit Profile</button>
            <button className="btn" onClick={handleClickOpenChangePassword}>Change Password</button>
            <Link to='/login'><button className="btn" onClick={handleClick}>logOut</button></Link>
        </div>
    </div>
    <Dialog open={openEditProfile} onClose={handleCloseEditProfile} >
    <DialogContent dividers style={{'width':'30vw','height':'70px'}}> 
    <div style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
        <h3>Edit Profile</h3>
        </div>
        </DialogContent>
    <DialogContent dividers style={{'width':'30vw','height':'40vh'}}> 
    <div style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
          <div style={{'marginTop':'30px'}}>
          <label htmlFor='file' style={{'cursor':'pointer'}}>
          <input type="file" name="file" id="file" accept="image/*"style={{'width':'200px','display':'none'}} onChange={handleChange}/>
          
          <img src={photoURL} alt="avatar" style={{'height':'100px','width':'100px','borderRadius':'50%','overflow':'hidden',border:'1px solid'}}/>
          </label>
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            fullWidth
            variant="standard"
            onChange={handleSetName}
            placeholder={user.username}
          />
          </div>
      </DialogContent>
      <DialogActions style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
          <Button onClick={handleUpdateNameAndImg}>Save Changes</Button>
        </DialogActions>
        
    </Dialog>

    <Dialog open={openChangePassword} onClose={handleCloseChangePassword} >
    <DialogContent dividers style={{'width':'30vw','height':'70px'}}> 
    <div style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
        <h3>Change Password</h3>
        </div>
        </DialogContent>
    <DialogContent dividers style={{'width':'30vw','height':'40vh'}}> 
    <div style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
          <TextField
            autoFocus
            margin="dense"
            id="oldpassword"
            label="old Password"
            fullWidth
            variant="standard"
            type="password"
          />
          <TextField
            margin="dense"
            id="newpassword"
            label="new Password"
            fullWidth
            variant="standard"
            type="password"
          />
          <TextField
            margin="dense"
            id="Cpassword"
            label="confirm New Password"
            fullWidth
            variant="standard"
            type="password"
          />
          {error && <span style={{marginTop:'15px'}}>{error}</span>}
          </div>
      </DialogContent>
      <DialogActions style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
          <Button onClick={handleUpdatePassword}>Save Changes</Button>
        </DialogActions>
        
    </Dialog>
</div>
        </div>
  )
}

export default ProfileContainer
