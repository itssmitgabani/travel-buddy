import React, { useContext } from 'react';
import './SideBar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import UserIcon from '@mui/icons-material/PersonOutlineOutlined';
import BookingIcon from '@mui/icons-material/CalendarMonthSharp';
import FeedbackSharpIcon from '@mui/icons-material/FeedbackSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { RiCoupon3Fill } from 'react-icons/ri';
import logo from '../../Images/logo.png'
import {Link , useLocation, useNavigate} from 'react-router-dom'
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
          <Link to="/hotels" className='Link'> 
          <li className={location.pathname.includes('/hotels')? 'activeSide' : null}>
            <HotelIcon className='icon'/>
            <span>Hotels</span>
          </li>
          </Link>
          <Link to="/airlines" className='Link'> 
          <li className={location.pathname.includes('/airlines')? 'activeSide' : null}>
            <FlightIcon className='icon'/>
            <span>Airlines</span>
          </li>
          </Link>
          <Link to="/users" className='Link'> 
          <li className={location.pathname.includes('/users') ? 'activeSide' : null}>
            <UserIcon className='icon'/>
            <span>Users</span>
          </li>
          </Link>
          <Link to="/bookings/hotel" className='Link'> 
          <li className={location.pathname.includes('/bookings') ? 'activeSide' : null}>
            <BookingIcon className='icon'/>
            <span>Bookings</span>
          </li>
          </Link>
          <Link to="/payment/hotel" className='Link'> 
          <li className={location.pathname.includes('/payment') ? 'activeSide' : null}>
            <BookingIcon className='icon'/>
            <span>Payment</span>
          </li>
          </Link>
            <Link to="/coupon" className='Link'> 
          <li className={location.pathname==='/coupon' ? 'activeSide' : null}>
            <RiCoupon3Fill className='icon'/>
            <span>Coupon</span>
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
