import './Widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UserIcon from '@mui/icons-material/PersonOutlineOutlined';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import BookingIcon from '@mui/icons-material/CalendarMonthSharp';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Widget = ({ type  }) => {
    let url = ""
    let da
    switch (type) {
        case "user":
            url = "/users/count";
            break

        case "hotelManagers":
            url = "/hotels/count"
            break

        case "airlineManagers":
            url = "/airlines/count"
            break

        case "hotelBookings":
            url = "/bookHotel/count";
            break

        case "flightBookings":
            url = "/bookAirline/count"
            break
        
        case "revenue":
            url = "/revenue/"
            break
        
        case "income":
            url = "/revenue/"
            break
        
        default:
    }
    
    const {data} = useFetch(url)
    console.log(data)
    switch(type){
    
        case "user":
            da={
                title:"USERS",
                link:"See all users",
                icon:<UserIcon className='icon' style={{color:"crimson" , backgroundColor: "rgba(255,0,0,0.2)",}}/>,
                isStats:false,
                to:'/users',
                count:data
            };
            break;
        case "hotelManagers":
            da={
                title:"HOTEL MANAGERS",
                link:"See all hotels",
                icon:<HotelIcon className='icon' style={{color:"#f09819" , backgroundColor: "rgba(218,165,32,0.2)",}}/>,
                isStats:false,
                to:'hotels',
                count:data
            };
            break;
        case "airlineManagers":
            da={
                title:"AIRLINE MANAGERS",
                link:"See all airlines",
                icon:<FlightIcon className='icon' style={{color:"#23a2f6" , backgroundColor: "rgba(35, 162, 246,0.2)",}}/>,
                isStats:false,
                to:'airlines',
                count:data
            };
            break;
        case "hotelBookings":
            da={
                title:"HOTEL BOOKINGS",
                link:"See all bookings",
                icon:<BookingIcon className='icon' style={{color:"#f09819" , backgroundColor: "rgba(218,165,32,0.2)",}}/>,
                isStats:false,
                to:'/bookings/hotel',
                count:data
            };
            break;
        case "flightBookings":
            da={
                title:"FLIGHT BOOKINGS",
                link:"See all bookings",
                icon:<BookingIcon className='icon' style={{color:"#23a2f6" , backgroundColor: "rgba(35, 162, 246,0.2)",}}/>,
                isStats:false,
                to:'/bookings/flight',
                count:data
            };
            break;
        case "revenue":
            da={
                title:"Revenue",
                icon:<PaidOutlinedIcon className='icon' style={{color:"green" , backgroundColor: "rgba(0, 128, 0,0.2)",}}/>,
                isStats:true,
                count:data.total
            
            };
            break;
            case "income":
            da={
                title:"Income (20% Commision - discount)",
                icon:<CurrencyRupeeOutlinedIcon className='icon' style={{color:"magenta" , backgroundColor: "rgba(255,0,255,0.2)",}}/>,
                isStats:true,
                count:data.income 
            };
            break;
        default:
                break;
    }

  return (
    <div className='widget'>
      <div className="left">
        <span className="title">{da.title}</span>
        <span className="counter">{da.count}{da.isStats && <>&nbsp; &#8377;</>}</span>
        {!da.isStats &&
            <Link className='Link' to={da.to}><span className="link">{da.link}</span></Link>
        }
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
