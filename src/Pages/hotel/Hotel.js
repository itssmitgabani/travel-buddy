import './hotel.scss'
import NavBar2 from '../../Components/navbar2/NavBar2'
import All from '../../Components/all/All'

const Hotel = ({type}) => {
  return (
    <div>
        <NavBar2 type="Hotels"/>
        <All type={type}/>
        {console.log(type)}
    </div>
  )
}

export default Hotel
