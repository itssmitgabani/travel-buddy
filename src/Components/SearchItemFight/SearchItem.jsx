import { Link, useNavigate } from 'react-router-dom'
import './SearchItem.scss'
import {format} from 'date-fns'

const SearchItem = ({item}) => {
  
var myDate = new Date(item.departure);
var myDate1 = new Date(item.arrival);
var time = item.departure.toString()
var time1 = item.arrival.toString()


const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/flight/${item._id}`);
  };
  return (
    <div className="searchItem1">
      
      <div className="siDesc">
        <h1 className="siTitle">{item.airlinename}</h1>
        <div className='fDetails'>
            <div className="from">
            <span>{item.sourcecity}</span>
            <span>{format(myDate , "MM/dd/yy")}</span>
            <span>{time.substring(11,16)}</span>
            </div>
            <hr style={{width:'300px'}}/>
            <div className="to">
            <span>{item.destinationcity}</span>
            <span>{format(myDate1 , "MM/dd/yy")}</span>
            <span>{time1.substring(11,16)}</span>
            </div>
           
        </div>
        <span className="siCancelOpSubtitle">
          Have a great journy!
        </span>
      </div>
      <div className="siDetails">
        <div></div>
        <div className="siDetailTexts">
            <div>
          <span className="siPrice">{item.rate}  &#x20B9; </span>
          </div>
          <span className="siTaxOp">Includes taxes and fees</span>
          
          <button className="siCheckButton" onClick={handleClick}>See flight</button>
          
        </div>
      </div>
    </div>
  )
}

export default SearchItem
