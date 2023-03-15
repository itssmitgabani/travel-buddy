import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import './ProfileMenu.scss'

const ProfileMenu = () => {

  const navigate = useNavigate();
  const {dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className='profileMenu'>
        <ul>
            <Link to='/profile' className='Link'><li>profile</li></Link>
            <Link to='/login' className='Link'><li onClick={handleClick}>logOut</li></Link>
        </ul>
    </div>
  )
}

export default ProfileMenu
