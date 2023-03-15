import './airline.scss'
import NavBar2 from '../../Components/navbar2/NavBar2'
import All from '../../Components/all/All'

const Airline = ({type}) => {
  return (
    <div>
        <NavBar2 type="Airlines"/>
        <All type={type}/>
    </div>
  )
}

export default Airline
