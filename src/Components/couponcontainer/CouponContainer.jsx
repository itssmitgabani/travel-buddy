import axios from 'axios';
import { useState } from 'react';
import './CouponContainer.scss'
import {format} from 'date-fns'
import Loader from '../Loader/Loader'


const CouponContainer = () => {

  const [credentials, setCredentials] = useState({
    couponName: undefined,
    discount: undefined,
    expireDate: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/coupon/create`, credentials);
      setLoading(false)
      setError(null)
      
    window.location.reload();
    } catch (err) {
      setLoading(false)
      setError(err.response.data.message)
    }finally{
    }
  };
  return (
    <div className='couponContainer'>
      {loading && <Loader/>}
        <h1>Add Coupon</h1>
        <hr/>
        <form action='' className='couponForm'>

        <label for="couponName">Coupon Name</label>
        <input type="text" placeholder="Coupon Name" id="couponname" onChange={handleChange} required/>

        <label for="discount">Discount(%)</label>
        <input type="number" placeholder="discount (%)" id="discount" onChange={handleChange} required/>

        
        <label for="expireDate">Expire Date</label>
        <input type="date" id="expireat" onChange={handleChange} min={format(new Date(),'yyyy-MM-dd')} required/>
        {error && <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'15px'}}><span>{error}</span></div>}
        <button onClick={handleClick} >Add</button>
        
    </form>
    </div>
  )
}

export default CouponContainer
