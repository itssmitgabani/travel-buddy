import './NavBar.scss'
import profile from '../../Images/LoginBg.jpg'
import ProfileMenu from '../profilemenu/ProfileMenu'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const NavBar = () => {

  const [openProfile,setOpenProfile] = useState(false);
  const handleClose = () => {
    setOpenProfile(false);
  };

  const {user} = useContext(AuthContext)

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

      {openProfile && <ProfileMenu />}
        </div>
    </div>
  )
}

export default NavBar
