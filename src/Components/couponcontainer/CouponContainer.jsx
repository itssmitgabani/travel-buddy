import axios from 'axios';
import { useState } from 'react';
import './CouponContainer.scss'


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
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/coupon/create", credentials);
      setError(null)
      
    window.location.reload();
    } catch (err) {
      setError(err.response.data.message)
    }finally{
    }
  };
  return (
    <div className='couponContainer'>
        <h1>Add Coupon</h1>
        <hr/>
        <form action='' className='couponForm'>

        <label for="couponName">Coupon Name</label>
        <input type="text" placeholder="Coupon Name" id="couponname" onChange={handleChange} required/>

        <label for="discount">Discount(%)</label>
        <input type="number" placeholder="discount (%)" id="discount" onChange={handleChange} required/>

        
        <label for="expireDate">Expire Date</label>
        <input type="date" id="expireat" onChange={handleChange} required/>
        {error && <span>{error}</span>}
        <button onClick={handleClick} >Add</button>
        
    </form>
    </div>
  )
}

export default CouponContainer
