import React from 'react';
import './SideBar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookingIcon from '@mui/icons-material/CalendarMonthSharp';
import FeedbackSharpIcon from '@mui/icons-material/FeedbackSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyIcon from '@mui/icons-material/Key';
import logo from '../../Images/logo.png'
import {Link , useLocation, useNavigate} from 'react-router-dom'
import FlightIcon from '@mui/icons-material/Flight';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    
  };
  return (
    <div className='sidebar'>
        <Link to="/" className='Link'>    
        <div className="top">
        <img src={logo} alt="logo" className='logo'/>
        </div>
        </Link>
 
      <div className="center">
        <ul className='list'>
        <Link to="/" className='Link'> 
          <li className={location.pathname==='/' ? 'activeSide' : null}>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to="/flights" className='Link'> 
          <li className={location.pathname.includes('/flights')? 'activeSide' : null}>
            <FlightIcon className='icon'/>
            <span>Flights</span>
          </li>
          </Link>
          
          <Link to="/bookings" className='Link'> 
          <li className={location.pathname.includes('/bookings') ? 'activeSide' : null}>
            <BookingIcon className='icon'/>
            <span>Bookings</span>
          </li>
          </Link>
          <Link to="/feedback" className='Link'> 
          <li className={location.pathname==='/feedback' ? 'activeSide' : null}>
            <FeedbackSharpIcon className='icon'/>
            <span>Feedbacks</span>
          </li>
          </Link>
          <Link to="/profile" className='Link'> 
          <li className={location.pathname==='/profile' ? 'activeSide' : null}>
            <AccountCircleIcon className='icon'/>
            <span>Profile</span>
          </li>
          </Link>
          <Link to="/changePassword" className='Link'> 
          <li className={location.pathname==='/changePassword' ? 'activeSide' : null}>
            <KeyIcon className='icon'/>
            <span>Change Password</span>
          </li>
          </Link>
          <Link to="/login" className='Link'> 
          <li onClick={handleClick}>
            <LogoutIcon className='icon'/>
            <span>logOut</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
