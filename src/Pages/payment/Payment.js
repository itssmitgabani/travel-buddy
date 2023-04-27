import React, { useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import useFetch1 from '../../hooks/useFetch1'
import './Payment.scss'
import {AuthContext} from '../../context/AuthContext'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import Loader from '../../Components/Loader/Loader'

const Payment = () => {
    const {user} = useContext(AuthContext)
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const {data , loading} = useFetch(`/payment/hotel/${user._id}`)
    const {data1 , loading1} = useFetch1(`/bank/hotel/${user._id}`)
    const da = data[0];
    console.log(data)
    console.log(data1)

    
  const [error,setError] = useState(null);
  const [load,setLoading] = useState(false);
    const handleClickOpenChangePassword = () => {
      setOpenChangePassword(true);
    };
  
    const handleCloseChangePassword = () => {
      setOpenChangePassword(false);
    };
    
  const handleUpdatePassword = async e => {
    e.preventDefault()
    setLoading(true)
    try{
      const info = {
        h_id: user._id,
        accountNo:document.getElementById("accountNo").value,
        ifscCode:document.getElementById("ifscCode").value,
        name:document.getElementById("name").value,
      }
      setError(null)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/bank/hotel/add`,info)
      setLoading(false)
      
      handleCloseChangePassword()
      window.location.reload()
    }
    catch(err){
      setLoading(false)
      setError(err.response.data.message)
      console.log(err)
    }
    
  };

  const handleClick = async () =>{
    setLoading(true)
    try{
      axios.put(`${process.env.REACT_APP_BASE_URL}/payment/hotel/request/${da && data[0]._id}`)
      setLoading(false)
      window.location.reload()
    }
    catch(err){
      setLoading(false)
      console.log(err)
    }
  }
  return (
    <div className='paymentContainer'>
      {
        (load || loading) && <Loader/>
      }
      <h1>Payment:</h1>

      <div style={{display:'flex',marginTop:'15px',gap:'20px',alignItems:'center'}}>
        <div className='PaymentC'>
            <h4>Total <br /> Paid Amount:</h4>
            <h1 className='count'>{da && Math.round(data[0].totalPaidAmt)}</h1>
        </div>
        <div className='PaymentC'>
        <h4>Total <br />Outstanding Amount:</h4>
        <h1 className='count'>{da && Math.round(data[0].totalOutstandingAmt)}</h1>
        </div>
        <div className='' style={{flex:1}}>
            <button className={(da && data[0].requested) || data1.length ===0 || da && data[0].totalOutstandingAmt===0? 'payButton g dis' : 'payButton g'} onClick={handleClick} >Request Payment</button>
            
            <button className={data1.length ===0 ? 'payButton b' : 'payButton b dis'}   onClick={handleClickOpenChangePassword}>Add Bank Account</button>
            {(da && data[0].requested) && "Payment Requested"}
        </div>
        <div className='' style={{flex:1}}>

        <Dialog open={openChangePassword} onClose={handleCloseChangePassword} >
    <DialogContent dividers style={{'width':'30vw','height':'70px'}}> 
    <div style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
        <h3>Add bank Details</h3>
        </div>
        </DialogContent>
    <DialogContent dividers style={{'width':'30vw','height':'40vh'}}> 
    <div style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
          <TextField
            autoFocus
            margin="dense"
            id="accountNo"
            label="Account No"
            fullWidth
            variant="standard"
            type="number"
          />
          <TextField
            margin="dense"
            id="ifscCode"
            label="IFSC code"
            fullWidth
            variant="standard"
            type="text"
          />
          <TextField
            margin="dense"
            id="name"
            label="Account Holder Name"
            fullWidth
            variant="standard"
            type="text"
          />
          
          {error && <span style={{marginTop:'15px'}}>{error}</span>}
          </div>
      </DialogContent>
      <DialogActions style={{'display':'flex','justifyContent':'center','flexDirection':'column','alignItems':'center'}}>
          <Button onClick={handleUpdatePassword}>Save Changes</Button>
        </DialogActions>
        
    </Dialog>
        
        </div>
      </div>
    </div>
  )
}

export default Payment
