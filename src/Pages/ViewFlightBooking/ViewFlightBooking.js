import React from 'react'
import './ViewFlightBooking.scss'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loader from '../../Components/Loader/Loader';

const ViewFlightBooking = () => {
  const {id} = useParams()
  const {data , loading} = useFetch(`/bookAirline/find/booking/${id}`)
  console.log(data)
  
  
  const da = data[0];
      
var time =  da && data[0].departure.toString()
var time1 = da && data[0].arrival.toString()

  return (
    <div className='hotelContainer3'>
      {loading && <Loader/>}
      <div className="left">
<img src={da && data[0].img} alt="img" />
      </div>
      <div className="right">
      <div className="item">
        <p><b>booking id:</b>{da && data[0]._id}</p>
      </div>
      <div className="item">
        <span><b>airline name:</b>{da && data[0].airlinename}</span>
      </div>
      <div className="item">
        <span><b>total seats:</b>{da && data[0].seats}</span>
      </div>
      <div className="item">
        <span><b>paid amount:</b>{da && data[0].totalAmt}</span>
        <span><b>discount amount:</b>{da && data[0].discountAmt}</span>
        <span></span>
      </div>
      <div className="item">
        <span><b>source city:</b>{da && data[0].sourcecity}</span>
        <span><b>destination city:</b>{da && data[0].destinationcity}</span>
        <span></span>
      </div>
      
      <div className="">
        <><b style={{marginRight:'20px'}}>departure date:</b>{da && data[0].departure.split("T")[0]}</>
        <span style={{marginLeft:'15px'}}><b style={{marginRight:'20px'}}>arrival date:</b>{da && data[0].arrival.split("T")[0]}</span>
        
      </div>
      <div className="item">
        <span><b>departure time:</b>{da && time.substring(11,16)}</span>
        <span><b>arrival time:</b>{da && time1.substring(11,16)}</span>
        <span></span>
      </div>
      <div className="item">
        <span><b>check in :</b>{da && data[0].checkin} kg</span>
        <span><b>cabin :</b>{da && data[0].cabin} kg</span>
        <span></span>
      </div>
      <div className="item">
        <p><b>verification status:</b><span className={da && data[0].verified ? "cellWithStatus activated" :"cellWithStatus deactivated"}>{da && data[0].verified ? "verified":"Not-verified"}</span></p>
      </div>
      </div>
      
    </div>
  )
}

export default ViewFlightBooking
