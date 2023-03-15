import { useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './FlightBook.scss'
const FlightBook = () => {
  
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  
  const { data } = useFetch(`/flight/f/${id}`);

  
  const da = data[0];

  
var time =  da && data[0].departure.toString()
var time1 = da &&data[0].arrival.toString()
  return (
    <div>
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
              check in {da && data[0].checkin} kg
            </span>
            <span className="hotelDistance">
              cabin {da && data[0].cabin} kg
            </span>
                <h2>
                  <b>{da && data[0].rate}$</b>
                </h2>
                <div className="lsItem">
              <label>seats</label>
              <input type="number" min={1} max={da && data[0].seats}  defaultValue='1' />
              
              </div>
                <button >Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FlightBook
