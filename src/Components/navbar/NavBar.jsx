import './NavBar.scss'
import '../profilemenu/ProfileMenu.scss'
import profile from '../../Images/LoginBg.jpg'
import ProfileMenu from '../profilemenu/ProfileMenu'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link , useNavigate} from 'react-router-dom'

const NavBar = () => {

  const [openProfile,setOpenProfile] = useState(false);
  const handleClose = () => {
    setOpenProfile(false);
  };
  
  const {user} = useContext(AuthContext)

  const navigate = useNavigate();
  const {dispatch } = useContext(AuthContext);

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
