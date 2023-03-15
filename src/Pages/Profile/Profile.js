import { useContext, useState } from 'react';
import './Profile.scss'
import { Link, useNavigate} from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'

const Profile = () => {
  
  const {user,dispatch} = useContext(AuthContext)
  
  const navigate = useNavigate();
  const [error,setError] = useState(null);
  const [name,setName] = useState(null);
  const [city,setCity] = useState(null);
  const [id,setId] = useState(null);
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
  const handleSetCity = (e) => {
    setCity(e.target.value)
  };
  const handleSetId = (e) => {
    setId(e.target.value)
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

  const handleUpdateNameAndImg = async e => {
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
        city:city? city: user.city,
        id:id? id: user.id,
        img:file !== null ? url : user.img,
      }

      await axios.put(`/users/updateNameAndImg/${user._id}`,updatedData)

      const newData = await axios.get(`/users/find/${user._id}`)
      localStorage.setItem("user", JSON.stringify(newData.data.details));
    }catch(err){
      console.log(err)
    }
    handleCloseEditProfile()
    
    window.location.reload();
  };

  const handleUpdatePassword = async e => {
    e.preventDefault()
    try{

      const passwords = {
        oldpassword:document.getElementById("oldpassword").value,
        newpassword:document.getElementById("newpassword").value,
        Cpassword:document.getElementById("Cpassword").value,
      }


      await axios.put(`/users/updatePassword/${user._id}`,passwords)
      setError(null)
      alert("you need to re-login")
      
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    }catch(err){
      setError(err.response.data.message)
    }
    handleCloseEditProfile()
  };

  return (
   
      <div className='profileContainer'>
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
        
        <div className="name">{user.username}</div><br />
        
			<div className="job">{user.mobileno}</div>
			<div className="job">{user.email}</div>
			<div className="job">city - {user.city}</div>
			<div className="job">id - {user.id}</div>
        
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
          
          <img src={photoURL} alt="avatar" style={{'height':'100px','width':'100px','borderRadius':'50%','overflow':'hidden'}}/>
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
            placeholder='smit'
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="city"
            fullWidth
            variant="standard"
            onChange={handleSetCity}
            placeholder='surat'
          />
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="id"
            fullWidth
            variant="standard"
            onChange={handleSetId}
            placeholder='632496625927'
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
          </div>
          {error && <span>{error}</span>}
      </DialogContent>
      <DialogActions style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
          <Button onClick={handleUpdatePassword}>Save Changes</Button>
        </DialogActions>
        
    </Dialog>
</div>
        </div>
  )
}

export default Profile
