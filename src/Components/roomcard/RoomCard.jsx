import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import './RoomCard.scss'
import Loader from '../Loader/Loader'

const RoomCard = ({r_id}) => {

    const {data ,loading} = useFetch(`/room/find/${r_id}`)
    const noofrooms = data.roomnumbers
    const im = data.img
  return (
    <div className="roomWrapper">
        {loading && <Loader/>}
        <div className="roomType"><span>{data.category}</span></div>
        <div className="roomImage">
            <img src={im && data.img[0]} alt="roomImage" />
        </div>
        <div className="roomDetails">
        <div className="roomItem">
            <span>No of Rooms:</span>
            <span>{noofrooms && data.roomnumbers.length}</span>
        </div>
        <div className="roomItem">
        <span>Price:</span>
            <span>{data.price}</span>
        </div>
        <div className="roomItem">
        <span>Allowance:</span>
        <span style={{'display':'flex','flexDirection':'column','alignItems':'end'}}>
            <span>{data.maxadults} Adults </span>
            <span>{data.maxchildren} child</span>
        </span>
        </div>
        </div>
        <Link to={`viewEdit/${r_id}`} className='Link'>
        <button className='editRoom'>View/Edit</button>
        </Link>
    </div>
  )
}

export default RoomCard
