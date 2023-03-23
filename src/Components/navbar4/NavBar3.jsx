import { Link ,useLocation} from 'react-router-dom'
import './NavBar3.scss'

const NavBar3 = () => {
  const location = useLocation()
  return (
    <div className='navbar3'>
      <ul>
        <Link to='/payment/hotel'><li className={location.pathname==='/payment/hotel'? 'activeNav':null}>Hotel</li></Link>
        <Link to='/payment/airline'><li className={location.pathname==='/payment/airline'? 'activeNav':null}>Airline</li></Link>
      </ul>
    </div>
  )
}

export default NavBar3
