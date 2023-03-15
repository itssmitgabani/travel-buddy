import { Link ,useLocation} from 'react-router-dom'
import './NavBar3.scss'

const NavBar3 = () => {
  const location = useLocation()
  return (
    <div className='navbar3'>
      <ul>
        <Link to='/bookings/hotel'><li className={location.pathname==='/bookings/hotel'? 'activeNav':null}>Hotel</li></Link>
        <Link to='/bookings/flight'><li className={location.pathname==='/bookings/flight'? 'activeNav':null}>Flight</li></Link>
      </ul>
    </div>
  )
}

export default NavBar3
