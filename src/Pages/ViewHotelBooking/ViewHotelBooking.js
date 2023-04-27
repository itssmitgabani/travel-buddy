import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import './ViewHotelBooking.scss'
import ReactStars from "react-rating-stars-component";
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../Components/Loader/Loader'
import Swal from 'sweetalert2'
const ViewHotelBooking = () => {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const {id} = useParams()
  const {data , loading} = useFetch(`/bookHotel/find/booking/${id}`)

  const [load , setLoading] = useState(false)
  
  console.log(data)
  
  const da = data[0];

  const ratingChanged = (newRating) => {
    setRating(newRating)
  };
  const [review,setReview] = useState()
  const [rating,setRating] = useState()
  const handliClick =async ()=>{
    setLoading(true)
    try{
      const info = {
        r_id : data[0].r_id,
        reviews:{
          u_id: user._id,
          rating:rating,
  review:review
        }
      }
  
      await axios.post(`${process.env.REACT_APP_BASE_URL}/review/add`,info)
      await axios.put(`${process.env.REACT_APP_BASE_URL}/bookHotel/reviewed/${data[0]._id}`)
      setLoading(false)
      Swal.fire(
        'Thanks!',
        'Thanks for Your review...',
        'success'
      ).then(result => {
        window.location.reload()
        }
      )
      window.location.reload()
    }
    catch(err){
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
    <div className='hotelContainer2'>
      {(loading || load) && <Loader/>}
      <div className="left">
<img src={da && data[0].img} alt="img" />
      </div>
      <div className="right">
      <div className="item">
      <p><b>booking id:</b>{da && data[0]._id}</p>
      </div>
      <div className="item">
        <span><b>hotel name:</b>{da && data[0].hotelname}</span>
      </div>
      <div className="">
        <b style={{marginRight:'20px'}}>hotel address:</b>{da && data[0].address}
      </div>
      <div className="">
        <b style={{marginRight:'20px'}}>hotel location:</b><a href={da && data[0].locationlink} target="_blank" className="aLink">{da && data[0].locationlink}</a>
      </div>
      <div className="item">
        <span><b>total rooms:</b>{da && data[0].rooms}</span>
        <span><b>total adults:</b>{da && data[0].adult}</span>
        <span><b>total children:</b>{da && data[0].children}</span>
      </div>
      <div className="item">
        <span><b>paid amount:</b>{da && data[0].totalAmt}</span>
        <span><b>discount amount:</b>{da && data[0].discountAmt}</span>
        <span></span>
      </div>
      <div className="item">
        <span><b>from date:</b>{da && data[0].bookingdate.split("T")[0]}</span>
        <span><b>to date:</b>{da && data[0].todate.split("T")[0]}</span>
        <span></span>
      </div>
      <div className="item">
        <span><b>Check-In:</b>{da && data[0].checkin}</span>
        <span><b>Check-Out:</b>{da && data[0].checkout}</span>
        <span></span>
      </div>
      <div className="">
        <span><b style={{marginRight:'20px'}}>room numbers:</b>
        {da &&data[0].roomNumberNo.map((item) => (
                  <span key={item}>{item}&emsp;</span>
                ))}
        </span>
      </div>
      <div className="item">
        <p><b>verification status:</b><span className={da && data[0].verified ? "cellWithStatus activated" :"cellWithStatus deactivated"}>{da && data[0].verified ? "verified":"Not-verified"}</span></p>
      </div>
      {((da&&data[0].verified) && ( da && !data[0].reviewed)) &&
  <>
      <h2 style={{marginTop:'10px',padding:'10px',color:'gray'}}>Add Review:</h2>
      <div style={{padding:' 0px 10px'}}>
      <ReactStars
    count={5}
    onChange={ratingChanged}
    size={40}
    activeColor="#ffd700"
    className='star'
  />
  </div>
 
      <textarea rows="5" style={{resize:'none',height:'100px',width:'90%',margin:'10px',padding:'10px'}} placeholder="review"
      onChange={(e)=>{setReview(e.target.value)}}
      >

      </textarea>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}><button className='btnAdd' onClick={handliClick}>submit</button></div>
      </>
      }
      </div> 
     
  
    </div>
  )
}

export default ViewHotelBooking
