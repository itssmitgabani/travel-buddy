import { Link,useLocation} from 'react-router-dom'
import './NavBar2.scss'

const NavBar2 = ({type}) => {
  const location = useLocation();
  return (
    <div className='navbar2'>
      <ul>
        <Link to={'/'+type.toLowerCase()}><li className={location.pathname==='/'+ type.toLowerCase() ? 'activeNav':null}>All {type}</li></Link>
        <Link to={'/'+type.toLowerCase()+'/activated'}><li className={location.pathname==='/'+type.toLowerCase()+'/activated' ? 'activeNav':null}>Activated</li></Link>
        <Link to={'/'+type.toLowerCase()+'/deactivated'}><li className={location.pathname==='/'+type.toLowerCase()+'/deactivated' ? 'activeNav':null}>Deactivated</li></Link>
      </ul>
    </div>
  )
}

export default NavBar2
