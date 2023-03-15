import { Link, useNavigate } from 'react-router-dom'
import './SearchItem.scss'

const SearchItem = ({item , dates}) => {
  
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotel/${item._id}`, { state: {dates } });
  };

  return (
    <div className="searchItem1">
      <img src={item.img[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.hotelname}</h1>
        <span className="siDistance">{item.address}</span>
        <span className="siTaxiOp">{item.category}</span>
        
        <div style={{display:'flex'}}>
        {item.amenities.map((item)=>(
          <span className="siSubtitle">
          {item}&emsp;
        </span>
        ))}
        </div>
        
        <span className="siCancelOp">{item.star} star hotel</span>
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
          <span className="siPrice">{item.price}  &#x20B9; </span>
          <span className='siDes'>/ Night</span>
          </div>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={handleClick}>See availability</button>
          
        </div>
      </div>
    </div>
  )
}

export default SearchItem
