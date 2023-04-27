import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useLocation , useNavigate} from 'react-router-dom';
import Coupon from '../../Components/Coupon/Coupon'
import { AuthContext } from '../../context/AuthContext';
import './FlightBookDetail.scss'
import StripeCheckout from 'react-stripe-checkout';
import Loader from '../../Components/Loader/Loader';
import Swal from 'sweetalert2'

const FlightBookDetail = () => {
  const navigate = useNavigate()
    const location = useLocation();
    const [data, setData] = useState(location.state.data);
    const [options, setOptions] = useState(location.state.options);
    
  const [loading,setLoading] = useState(false)
  const {user} = useContext(AuthContext)

    const [model,setOpen] = useState(false);
    
  const [discount,setDiscount] = useState(0);
const handleClick = () =>{
    setOpen(true)
  }

    
var time =  data.departure.toString()
var time1 = data.arrival.toString()

const handlePay = async () =>{
    const info = {
      u_id:user._id,
      totalAmt: data.rate * options.seats - data.rate * options.seats/ 100*discount,
      discountAmt: data.rate * options.seats/ 100*discount ,
      a_id: data.a_id ,
      ...options,
      f_id:data._id
    }
    try{
      await axios.post(`${process.env.REACT_APP_BASE_URL}/bookAirline/book`,info)
    }catch(err){
  console.log(err)
    }
  }

  
const onToken = async (token) =>{
  setLoading(true)
  const info = {
    u_id:user._id,
    totalAmt: data.rate * options.seats - data.rate * options.seats/ 100*discount,
    discountAmt: data.rate * options.seats/ 100*discount ,
    a_id: data.a_id ,
    ...options,
    f_id:data._id,
    token
  }
  try{
    await axios.post(`${process.env.REACT_APP_BASE_URL}/bookAirline/book`,info)
    await axios.put(`${process.env.REACT_APP_BASE_URL}/flight/updateSeats/${info.f_id}`,{seats:info.seats})
    await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/airline/add/${info.a_id}`,{amount:(info.totalAmt-=(info.totalAmt/10))})
    setLoading(false)
    Swal.fire(
      'Congratulations!',
      'Flight Booked Successfully...',
      'success'
    ).then(result => {
      navigate("/bookings")
      }
    )
    navigate("/bookings")
  }catch(err){
console.log(err)
setLoading(false)
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
        {
          loading && <Loader/>
        }
      <h1 style={{color:'gray'}}>Booking Detail</h1>
      <div className="Info">
      <div className="hotelInfo">
        <h3 style={{width:'100%'}}>{data.airline.airlinename}</h3>
        
              <div className="hotelDetailsTexts">
              <div className='fDetails'>
            <div className="from">
            <span>{data.sourcecity}</span>
            <span>{time.substring(0,10)}</span>
            <span>{time.substring(11,16)}</span>
            </div>
            <hr style={{width:'300px'}}/>
            <div className="to">
            <span>{data.destinationcity}</span>
            <span>{time1.substring(0,10)}</span>
            <span>{time1.substring(11,16)}</span>   
            </div>
            </div>
            </div>
      </div>
      <div className="bookingInfo">
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Total Seats :</h5>{options.seats}
        </div>

        <h2 style={{textAlign:'right',color:'gray'}}>Amount</h2>
        
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5 >Total Amount :</h5>{data.rate * options.seats}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Discount Amount :</h5>{data.rate * options.seats/ 100*discount}
        
          </div>
          <button className='btn' onClick={handleClick}>Apply Coupon</button>
          {model && <Coupon setOpen={setOpen} setDiscount={setDiscount}></Coupon>}
        <hr/>
        
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h5>Payable Amount :</h5>{data.rate * options.seats - data.rate * options.seats/ 100*discount
        }
        </div>
        <div className='btn'>
        <StripeCheckout
        
        token={onToken}
        stripeKey="pk_test_51MnfjYHtJIZ5x7GiF53SWZjofaZDDjDFuGrZxnk8qrfJrTAcnVQNSibFq9laRWGJd6kibrPsqthrhCsFizZvYhsb00OHRfW07t"
        currency='INR'
        amount={(((data.rate * options.seats) -( data.rate * options.seats/ 100*discount)) )* 100}
        >
        <button className='btn' >Pay Now</button>
        </StripeCheckout>
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default FlightBookDetail
