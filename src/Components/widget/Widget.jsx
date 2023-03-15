import './Widget.scss'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import KingBedIcon from '@mui/icons-material/KingBed';
import BookingIcon from '@mui/icons-material/CalendarMonthSharp';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';

const Widget = ({ type }) => {
    let da,url;
    const {user} = useContext(AuthContext)

    switch(type){
        case "bookings":
          url = `bookHotel/count/${user._id}`
            
            break;
        case "revenue":
          url = `bookHotel/totalRevenue/${user._id}`
            break;
        case "rooms":
          url = `room/totalRoom/${user._id}`
            break;
        default:
                break;
          }
          
    const {data} = useFetch(url)
    switch(type){
        case "bookings":
            da={
                title:"BOOKINGS",
                icon:<BookingIcon className='icon' style={{color:"#f09819" , backgroundColor: "rgba(218,165,32,0.2)",}}/>,
                count:data,
            };
            break;
        case "revenue":
            da={
                title:"REVENUE",
                icon:<CurrencyRupeeOutlinedIcon className='icon' style={{color:"green" , backgroundColor: "rgba(0, 128, 0,0.2)",}}/>,
                count:data.total
            };
            break;
        case "rooms":
            da={
                title:"ROOMS",
                icon:<KingBedIcon className='icon' style={{color:"#23a2f6" , backgroundColor: "rgba(35, 162, 246,0.2)",}}/>,
                count:data.total
            };
            break;
        default:
                break;
    }

  return (
    <div className='widget'>
      <div className="left">
        <span className="title">{da.title}</span>
        <span className="counter">{da.count}</span>
      </div>
      <div className="right">
        <div>
        </div>
        
        {da.icon}
      </div>
    </div>
  )
}

export default Widget
