import { useContext } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import './FlightBook.scss'
const FlightBook = () => {
  
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  
  const { data ,loading} = useFetch(`/flight/f/${id}`);

  
  const da = data[0];

  
var time =  da && data[0].departure.toString()
var time1 = da &&data[0].arrival.toString()

const [options, setOptions] = useState({
  seats: 1,
});

const handleOption = (name, operation) => {
  setOptions((prev) => {
    return {
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    };
  });
};
const {user} = useContext(AuthContext)
const navigate = useNavigate();
const handleClick = () => {
  if(user === null){
    return alert("login first")
  }
  navigate("/flight/bookingDetail",{state:{ data:data[0],options}})
};
  return (
    <div>
      {loading && <Loader/>}
      <div className="airlneContainer1">
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{da && data[0].airline.airlinename}</h1>
           
            
          
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
              <div className='fDetails'>
            <div className="from">
            <span>{da && data[0].sourcecity}</span>
            <span>{ da &&time.substring(0,10)}</span>
            <span>{da &&time.substring(11,16)}</span>
            </div>
            <hr style={{width:'300px'}}/>
            <div className="to">
            <span>{da && data[0].destinationcity}</span>
            <span>{da &&time1.substring(0,10)}</span>
            <span>{da &&time1.substring(11,16)}</span>
            </div>
           
        </div>
        
              </div>
            
              <div className="hotelDetailsPrice">
              <span className="hotelDistance">
              check in - {da && data[0].checkin} kg
            </span>
            <span className="hotelDistance">
              cabin - {da && data[0].cabin} kg
            </span>
                <h2>
                  <b>{da && data[0].rate * options.seats}&#x20B9;</b>
                </h2>
                <div className="lsItem">
              <div className="optionItem">
                <span className="optionText">Seats</span>
                <div className="optionCounter">
                  
                  <button
                    disabled={options.seats <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("seats", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.seats}</span>
                  <button
                  disabled={(da && data[0].availableSeats <=options.seats) ||  options.seats >= 4}
                    className="optionCounterButton"
                    onClick={() => handleOption("seats", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              
              </div>
              <span>{da && data[0].availableSeats < 10 && "Hurry Up" }<b> {da && data[0].availableSeats}</b> Seats Available</span>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FlightBook
