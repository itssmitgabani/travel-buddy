import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader/Loader';
import useFetch from '../../hooks/useFetch';
import './ViewBooking.scss'

const ViewBooking = () => {

    let { id } = useParams();
const {data , loading} = useFetch(`/airlines/getBookingDetails/${id}`);
const handleclick = async () =>{
  
    try{
        await axios.put(`${process.env.REACT_APP_BASE_URL}/bookAirline/verify/${id}`);
        
        window.location.reload(true);
        
    }catch(err){
        console.log(err)
    }
}
  return (
    <div className='viewBookingContainer'>
      {loading  && <Loader/>}
      <h1>Booking Details:</h1>
      <div className="container1">
        <div className="label">
            <span className="l">Customer name :</span>
            <span className="l">Email :</span>
            <span className="l">Mobile No :</span>
            <span className="l">Total Seats :</span>
            <span className="l">Total Amount :</span>
            <span className="l">Discount Amount :</span>
            <span className="l">Booking Date :</span>
            <span className="l">Status :</span>
        </div>
        <div className="value">
            <span className="v">{data.username}</span>
            <span className="v">{data.email}</span>
            <span className="v">{data.mobileno}</span>
            <span className="v">{data.seats}</span>
            <span className="v">{data.totalAmt}</span>
            <span className="v">{data.discountAmt}</span>
            <span className="v">{data.createdAt? data.createdAt.split("T")[0] :data.createdAt}</span>
            <span className="v">{data.verified? "Verified": "Not Verified"}</span>
        </div>
      </div>
      {!data.verified && <button style={{ 
                    background: "linear-gradient(to right, #1845ad, #23a2f6 )"}}onClick={handleclick}>Verify</button>}
    </div>
  )
}

export default ViewBooking
