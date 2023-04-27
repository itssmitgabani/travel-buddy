import './Widget.scss'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import FlightIcon from '@mui/icons-material/Flight';
import BookingIcon from '@mui/icons-material/CalendarMonthSharp';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';

const Widget = ({ type }) => {
    let da,url;
    const {user} = useContext(AuthContext)

    switch(type){
        case "bookings":
          url = `/bookAirline/count/${user._id}`
            
            break;
        case "revenue":
          url = `/bookAirline/totalRevenue/${user._id}`
            break;
        case "flights":
          url = `/flight/totalFlight/${user._id}`
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
        case "flights":
            da={
                title:"FLIGHTS",
                icon:<FlightIcon className='icon' style={{color:"#23a2f6" , backgroundColor: "rgba(35, 162, 246,0.2)",}}/>,
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
