import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './WishlistItem.scss'

const WishlistItem = ({item}) => {
    
  const {data} = useFetch(`/room/wishlistRoom/${item}`)
  const da = data;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotel/${da && data._id}`);
  };

  const [da1,setDa] = useState(data)
  useEffect(() => { setDa(data)}, [data] )
  console.log(da1)
  return (
    <div className="searchItem2">
        
      <img src={da1._id  ? data.img[0] : ''} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{da && data.hotelname}</h1>
        <span className="siDistance">{da && data.address}</span>
        <span className="siTaxiOp">{da && data.category}</span>
        
        <div style={{display:'flex'}}>
        {da1._id && data.amenities.map((item)=>(
          <span className="siSubtitle" key={item}>
          {item}&emsp;
        </span>
        ))}
        </div>
        <span className="siCancelOp">{da && data.star} star hotel</span>
        <span className="siCancelOpSubtitle">
          Have a great vacation!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>5.0</button>
        </div>
        <div className="siDetailTexts">
            <div>
          <span className="siPrice">{da && data.price}  &#x20B9; </span>
          <span className='siDes'>/ Night</span>
          </div>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={handleClick}>See availability</button>
          
        </div>
      </div>
    </div>
  )
}

export default WishlistItem
