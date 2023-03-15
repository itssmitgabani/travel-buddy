import { Link } from 'react-router-dom'
import './ProfileMenu.scss'

const ProfileMenu = () => {
  return (
    <div className='profileMenu'>
        <ul>
            <Link to='/profile' className='Link'><li>profile</li></Link>
            <Link to='/login' className='Link'><li>logOut</li></Link>
        </ul>
    </div>
  )
}

export default ProfileMenu
