import { format } from 'date-fns';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Coupon from '../../Components/Coupon/Coupon';
import './HotelBookDetail.scss'

const HotelBookFDetail = () => {
    const location = useLocation();

  const [dates, setDates] = useState(location.state.dates);
  const [data, setData] = useState(location.state.data);
  const [days, setDays] = useState(location.state.days);
  const [selectedRoom, setSelectedRoom] = useState(location.state.selectedRoom);
  const [options, setOptions] = useState(location.state.options);
  const [model,setOpen] = useState(false);
  const [discount,setDiscount] = useState(0);
  

  const fDate = format(dates.startDate,"MM-dd-yyyy ")
  const tDate = format(dates.endDate,"MM-dd-yyyy ")
  

const handleClick = () =>{
  setOpen(true)
}
  return (
    <div className='DetailContainer'>
      <h1 style={{color:'gray'}}>Booking Detail</h1>
      <div className="Info">
      <div className="hotelInfo">
        <h3 style={{width:'100%'}}>{data.hotel.hotelname}</h3>
        <img src={data.img[0]} alt="" />
      </div>
      <div className="bookingInfo">
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5 >From Date : </h5>{fDate}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>To Date :</h5>{tDate}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Total Adults :</h5>{options.adult}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Total Children :</h5>{options.children}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Total Room :</h5>{selectedRoom.length}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Total Days :</h5>{days}
        </div>

        <h2 style={{textAlign:'right',color:'gray'}}>Amount</h2>
        
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5 >Total Amount :</h5>{data.price*days*selectedRoom.length}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Discount Amount :</h5>{(data.price*days*selectedRoom.length  ) / 100*discount}
        
          </div>
          <button className='btn' onClick={handleClick}>Apply Coupon</button>
          {model && <Coupon setOpen={setOpen} setDiscount={setDiscount}></Coupon>}
        <hr/>
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Payable Amount :</h5>{data.price*days*selectedRoom.length - (data.price*days*selectedRoom.length  ) / 100*discount}
        </div>
        <button className='btn'>Pay Now</button>
       
      </div>
      </div>
      
    </div>
  )
}

export default HotelBookFDetail
