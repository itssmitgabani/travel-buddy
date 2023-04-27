import axios from 'axios';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Coupon from '../../Components/Coupon/Coupon';
import { AuthContext } from '../../context/AuthContext';
import './HotelBookDetail.scss'
import Loader from '../../Components/Loader/Loader'
import StripeCheckout from 'react-stripe-checkout';
import {useNavigate} from 'react-router-dom' 
import Swal from 'sweetalert2'

const HotelBookFDetail = () => {
    const location = useLocation();
const navigate = useNavigate()
  const [dates, setDates] = useState(location.state.dates);
  const [data, setData] = useState(location.state.data);
  const [days, setDays] = useState(location.state.days);
  const [selectedRoom, setSelectedRoom] = useState(location.state.selectedRoom);
  const [selectedRoomNo, setSelectedRoomNo] = useState(location.state.selectedRoomNo);
  const [options, setOptions] = useState(location.state.options);
  const [model,setOpen] = useState(false);
  const [discount,setDiscount] = useState(0);
  const {user} = useContext(AuthContext)
  
  const [loading,setLoading] = useState(false)

  const fDate = format(dates.startDate,"MM-dd-yyyy ")
  const tDate = format(dates.endDate,"MM-dd-yyyy ")
  

const handleClick = () =>{
  setOpen(true)
}

const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const date = new Date(start.getTime());

  const dates = [];

  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const alldates = getDatesInRange(dates.startDate, dates.endDate);


const handlePay = async () =>{
  
  
}

const onToken = async (token) =>{
  setLoading(true)
  const info = {
    u_id:user._id,
    totalAmt: data.price*days*selectedRoom.length - (data.price*days*selectedRoom.length  ) / 100*discount ,
    discountAmt: (data.price*days*selectedRoom.length  ) / 100*discount ,
    h_id: data.h_id ,
    ...options,
    rooms: selectedRoom.length ,
    bookingdate: new Date(new Date().setDate(dates.startDate.getDate())).toISOString(),
    todate: new Date(new Date().setDate(dates.endDate.getDate())).toISOString(),
    roomNumber: selectedRoom,
    roomNumberNo: selectedRoomNo,
    r_id:data._id,
    token
  }

  try{
    await axios.post(`${process.env.REACT_APP_BASE_URL}/bookHotel/book`,info)
    await Promise.all(
      selectedRoom.map((roomId) => {
        const res = axios.put(`${process.env.REACT_APP_BASE_URL}/room/availability/${roomId}`, {
          dates: alldates,
        });
        return res.data;
      })
    );

    await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/hotel/add/${info.h_id}`,{amount:(info.totalAmt-=(info.totalAmt/10))})
    setLoading(false)
    Swal.fire(
      'Congratulations!',
      'Hotel Booked Successfully...',
      'success'
    ).then(result => {
      navigate("/bookings")
      }
    )
    navigate("/bookings")
  }catch(err){
    setLoading(false)
console.log(err)
Swal.fire(
  'OOps!',
  'Something Went Wrong...',
  'success'
).then(result => {
  navigate("/")
  }
)
  }

}
  return (
    <div className='DetailContainer'>
      {loading && <Loader/>}
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
        <h5>Payable Amount :</h5>{data.price*days*selectedRoom.length - (data.price*days*selectedRoom.length  ) / 100*discount
        }
        </div>
        <div className='btn'>
        <StripeCheckout
        
        token={onToken}
        stripeKey="pk_test_51MnfjYHtJIZ5x7GiF53SWZjofaZDDjDFuGrZxnk8qrfJrTAcnVQNSibFq9laRWGJd6kibrPsqthrhCsFizZvYhsb00OHRfW07t"
        currency='INR'
        amount={((data.price*days*selectedRoom.length) - ((data.price*days*selectedRoom.length  ) / 100*discount) )* 100}
        >
        <button className='btn' >Pay Now</button>
        </StripeCheckout>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default HotelBookFDetail
