import React from 'react'
import './Review.scss'
import StarIcon from '@mui/icons-material/Star';

const Review = ({info}) => {
    const rows = [];
    for (var i=0; i < info.rating; i++) {
        rows.push('&#9733;')
    } 
  return (
    <div className='rwContainer'>
      <div className="userInfo">
        <img src={info.img} alt="" className='uImg'/>
        <span>{info.username}</span>
      </div>
      <div className='starContainer'><span style={{color:'#ffd700',fontSize:'18px'}}>
      
    {rows.map(()=>(
        <StarIcon/>
    ))}
        </span></div>
      <span>{info.review}</span>
    </div>
  )
}

export default Review
