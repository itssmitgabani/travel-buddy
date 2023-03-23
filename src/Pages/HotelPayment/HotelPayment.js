import React from 'react'
import NavBar3 from '../../Components/navbar4/NavBar3'
import './HotelPayment.scss'
import useFatch from '../../hooks/useFetch'
import All from '../../Components/all/All'
import Loader from '../../Components/Loader/Loader'
import axios from 'axios'

const HotelPayment = () => {

  const {data , loading} = useFatch('/payment/hotel/all/payment')

  const handleClick = async (e) =>{
    try{
      await axios.put(`/payment/hotel/approve/${e.target.id}`)
      window.location.reload()
    }
    catch(err){
      console.log(err)
    }
    
  }
  return (
    <div>
      {loading && <Loader/>}
      <NavBar3/>
      
      <h1 className='payHead'>Payment Requests:</h1>
      <div className='hotelPay'>
      {
        data.length === 0 && <div> No Payment Requests</div>
       }
          {data.map((item)=>(
            <div className='singlePay'>
              <span> hotel Id: {item.h_id}</span>
              <span> hotel name : {item.hotel.hotelname}</span>
              <span> payable Amount : {item.totalOutstandingAmt}</span>
              <span> Request Date : {item.updatedAt.split("T")[0]}</span>
              <button id={item._id} className='btnApp' onClick={handleClick}>Approve Payment</button>
            </div>
          ))}
        
      </div>
    </div>
  )
}

export default HotelPayment
