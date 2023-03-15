import './user.scss'
import NavBar2 from '../../Components/navbar2/NavBar2'
import All from '../../Components/all/All'
const User = ({type}) => {
  return (
    <div>
        <NavBar2 type="Users"/>
        <All type={type}/>
    </div>
  )
}

export default User
