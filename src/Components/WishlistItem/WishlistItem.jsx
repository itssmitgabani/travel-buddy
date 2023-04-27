import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './WishlistItem.scss'
import Skeleton from '@mui/material/Skeleton';

const WishlistItem = ({item}) => {
    
  const {data,loading} = useFetch(`/room/wishlistRoom/${item}`)
  const da = data;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotel/${da && data._id}`);
  };

  const [da1,setDa] = useState(data)
  useEffect(() => { setDa(data)}, [data] )
  console.log(da1)
  return (
    <>{
      loading ?
      <div className="searchItem2">
        <Skeleton variant="rectengular"width={200} height={200} />
      <div className="siDesc" style={{width:"200px"}}>
      <Skeleton variant='h1'/>
      <Skeleton variant='text'/>
      <Skeleton variant='text'/>
      <Skeleton variant='text'/>
      <Skeleton variant='text'/>
      <Skeleton variant='text'/>
        
        
      </div>
      <div className="siDetails">
        <div className="siRating">
        <Skeleton variant='text'/>
        </div>
        <div className="siDetailTexts">
            <div>
            <Skeleton variant='text'/>
          </div>
          <Skeleton variant='text'/>
          
        </div>
      </div>
    </div> 
      :
      <div className="searchItem2">
      <img src={da1._id  ? data.img[0] : ''} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{da && data.hotelname}</h1>
        <span className="siDistance">{da && data.address}</span>
        <span className="siTaxiOp">{da && data.category}</span>
        
        
        <div style={{display:'flex',flexWrap:'wrap',gap:'2px 20px'}}>
        {da1._id && data.amenities.map((item)=>(
          <span className="siTaxiOp1" key={item}>
          &nbsp;{item}&nbsp;
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
    }
    
    </>
  )
}

export default WishlistItem
