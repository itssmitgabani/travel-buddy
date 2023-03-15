import './NavBar.scss'
import logo from '../../Images/logo.png'
import {Link, useNavigate} from "react-router-dom"
import { useContext, useState } from 'react'
import {AuthContext} from '../../context/AuthContext.js'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NavBar = () => {
  const {user , dispatch} = useContext(AuthContext)

  const [openProfile,setOpenProfile] = useState(false);
  const handleClose = () => {
    setOpenProfile(false);
  };
  
  const navigate = useNavigate()
  const handleClick = async (e) => {
    setOpenProfile(false)
    navigate("/profile");
  }

  const handleClick1 = async (e) => {
    setOpenProfile(false)
    navigate("/wishlist");}

    const handleClick2 = async (e) => {
      setOpenProfile(false)
      navigate("/bookings");
    }
  
    const handleClick3 = async (e) => {
      setOpenProfile(false)
      navigate("/feedback");}

      const handleClick4 = async (e) => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    
    

  return (

    <div className='NavBarContainer'>
      <div className="left">

      <Link to="/"><img className="logo" src={logo} alt="logo-img"/></Link>
      </div>
      <div className="right">
      <ul className="main-nav">
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/hotel"><li>Hotel</li></Link>
                        <Link to="/flight"><li>Flight</li></Link>
                        <Link to="/ContactUs"><li>Contact us</li></Link>
                        <Link to="/AboutUs"><li>About us</li></Link>
                        {!user && <Link to="/login"><li>sign in</li></Link>}
                        {user && <li className='pro' style={{textTransform:'none',fontSize:'100%'}} onClick={() => setOpenProfile(!openProfile)} onClose={handleClose}>
                          <div style={{display:'flex','alignItems':'flex-end',gap:'10px'}}>
                          <img src={user.img} style={{width:'40px',height:'40px',borderRadius:'50%'}}/>

                        <span>{user.username}</span>
                        {openProfile ? <ExpandLessIcon/>: <ExpandMoreIcon/>}
                          </div> 
                          
                          </li>}
                          
                    </ul>

      </div>
      {openProfile && 
      
      <div className='profileMenu'>
        <ul>
            <li onClick={handleClick}>profile</li>
            <li onClick={handleClick1}>wishlist</li>
            <li onClick={handleClick2}>booking</li>
            <li onClick={handleClick3}>feedback</li>
            <li onClick={handleClick4}>logOut</li>
        </ul>
    </div>}
    </div>
  )
}

export default NavBar
