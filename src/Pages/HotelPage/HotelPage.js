import './HotelPage.scss'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

const HotelPage = () => {
  const [openDate,setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [error, setError] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const navigate = useNavigate();
  const handleClick = () => {
    if(destination===""){
      return setError(true)
    }
    navigate("search", { state: { destination, date } });
  };

  return (
    <div className='hotelContainer'>
      <div className="searchContainer">
        <div className="title">
          <span >Find Hotel</span>
        </div>
        <div className="searchItem">
        <LocationOnIcon className='icon'/><input type="text" placeholder='where are you going?' onChange={(e) => setDestination(e.target.value)}/>
        
        </div>
        {error && <span style={{color:"crimson" , paddingLeft:"90px"}}>Destination can not blank</span>}
        <div className="searchItem">
        <CalendarMonthIcon className='icon'/><span className='span' onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate,"MM-dd-yyyy ")} to ${format(date[0].endDate,"MM-dd-yyyy ")}`}</span>
        </div>
        {openDate &&<DateRange
  editableDateInputs={true}
  onChange={item => setDate([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={date}
  className="date"
  minDate={new Date()}
/>}


  <button className='btnSearch' onClick={handleClick}>Search</button>
  
      </div>
      
    </div>
  )
}

export default HotelPage
