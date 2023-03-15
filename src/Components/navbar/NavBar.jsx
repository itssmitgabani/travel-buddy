import './NavBar.scss'
import profile from '../../Images/LoginBg.jpg'
import ProfileMenu from '../profilemenu/ProfileMenu'
import { useContext, useState } from 'react'
import '../profilemenu/ProfileMenu.scss'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

  const [openProfile,setOpenProfile] = useState(false);
  const handleClose = () => {
    setOpenProfile(false);
  };

  const {user,dispatch} = useContext(AuthContext)

  const navigate = useNavigate();

  const handleClick = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  const handleClick1 = async (e) => {
    setOpenProfile(false)
    navigate("/profile");}

  return (
    <div className='navbar'>
      <div></div>
      <div className="wrapper">
        
      </div>
      <div className='wrapper'>
        <div className="profileContainer">
          <img src={user && user.img} alt='profile' className="profilePic" />
        </div>
        <div className='nameContainer' onClick={() => setOpenProfile(!openProfile)} onClose={handleClose}>
          <span>Hello,</span>
          <span>{user && user.username}</span>
      </div>

      {openProfile &&
      <div className='profileMenu'>
      <ul>
          <li onClick={handleClick1}>profile</li>
          <li onClick={handleClick}>logOut</li>
      </ul>
  </div>}
        </div>
    </div>
  )
}

export default NavBar
