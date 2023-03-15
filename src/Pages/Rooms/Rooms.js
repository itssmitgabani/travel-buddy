import React, { useContext } from 'react'
import RoomCard from '../../Components/roomcard/RoomCard'
import './Rooms.scss'
import {Link} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext.js"

const Rooms = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className="roomContainer">
      
      {user.rooms.map(item=>{
        return <RoomCard key={item} r_id={item}/>
      })}

      <Link to="add" className='link'><div className="addRoom">+</div></Link>
    </div>
  )
}

export default Rooms
