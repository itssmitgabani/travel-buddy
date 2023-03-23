import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import './Coupon.scss'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';

const Coupon = ({setOpen,setDiscount}) => {
    
    const {data } = useFetch("/coupon/active")
    const handleClick =  (e) => {
      setDiscount(e.target.value)
          setOpen(false);
        
      };
  return (
    <div className='cContainer'>
        <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Apply Coupon:</span>
        
          <div className="rItem">
            
            <div className="rSelectCoupons">
            {data.map((item) => (
                <div className="coupon" >
                  <label >{`Coupon name : ${item.couponname}`}</label>
                  <label >{`discount : ${item.discount}%`}</label>
                  
                  <button className="Button" value={item.discount} onClick={handleClick}>Apply</button>
                </div>
              ))}
            </div>
          </div>
        
      </div>
    
      
    </div>
  )
}

export default Coupon
