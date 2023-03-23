import React from 'react'
import NavBar3 from '../../Components/navbar4/NavBar3'
import './AirlinePayment.scss'
import useFatch from '../../hooks/useFetch'
import Loader from '../../Components/Loader/Loader'
import axios from 'axios'

const AirlinePayment = () => {
  
  const {data , loading} = useFatch('/payment/airline/all/payment')
  const handleClick = async (e) =>{
    try{
      await axios.put(`/payment/airline/approve/${e.target.id}`)
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
      <h1 className='paymentHead'>Payment Requests:</h1>
      <div className='airPay'>

       {
        data.length === 0 && <div> No Payment Requests</div>
       }
          {data.map((item)=>(
            <div className='singlePay'>
              <span> airline Id: {item.a_id}</span>
              <span> airline name : {item.airline.airlinename}</span>
              <span> payable Amount : {item.totalOutstandingAmt}</span>
              <button id={item._id} className='btnApp' onClick={handleClick}>Approve Payment</button>
            </div>
          ))}
        
      </div>
    </div>
  )
}

export default AirlinePayment
