import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Calendar } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, format } from 'date-fns';
import './FlightPage.scss'
import { Link, useNavigate } from 'react-router-dom';

const FlightPage = () => {
  const [openDate,setOpenDate] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    if(from==="" || to===""){
      return setError(true)
    }
    navigate("search", { state: { from , to , date } });
  };
  return (
    <div className='flightContainer'>
      <div className="searchContainer">
        <div className="title">
          <span >Find Flight</span>
        </div>
        <div className="searchItem">
        <LocationOnOutlinedIcon className='icon'/><input type="text" placeholder='From' onChange={(e) => setFrom(e.target.value)}/>
        </div>
        <div className="searchItem">
        <LocationOnIcon className='icon'/><input type="text" placeholder='To' onChange={(e) => setTo(e.target.value)}/>
        </div>
        <div className="searchItem">
        <CalendarMonthIcon className='icon'/><span className='span' onClick={()=>setOpenDate(!openDate)}>{`${format(date,"MM-dd-yyyy ")}`}</span>
        </div>
        {openDate &&<Calendar onChange={item => setDate(item)} date={date} className="date" minDate={new Date()}/>}


         <button className='btnSearch' onClick={handleClick}>Search</button>
         {error && <span style={{color:"crimson" , paddingLeft:"90px"}}>Fields can not blank</span>}
      </div>
      
    </div>
  )
}

export default FlightPage
