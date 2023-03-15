import { Link } from 'react-router-dom'
import './FlightCard.scss'

const RoomCard = () => {
  return (
    <div className="roomWrapper">
        <div className="roomType"><span>Deluxe</span></div>
        <div className="roomImage">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/383008510.webp?k=2f29b1a08014c5efbffe5dddc6049428f28b2e5cff337aef9ffe9cc7c691709b&o=&s=1" alt="roomImage" />
        </div>
        <div className="roomDetails">
        <div className="roomItem">
            <span>No of Rooms:</span>
            <span>12</span>
        </div>
        <div className="roomItem">
        <span>Price:</span>
            <span>11,002$</span>
        </div>
        <div className="roomItem">
        <span>Allowance:</span>
        <span style={{'display':'flex','flexDirection':'column','alignItems':'end'}}>
            <span>2 Adults </span>
            <span>2 children</span>
            </span>
        </div>
        </div>
        <Link to='viewEdit' className='Link'>
        <button className='editRoom'>View/Edit</button>
        </Link>
    </div>
  )
}

export default RoomCard
