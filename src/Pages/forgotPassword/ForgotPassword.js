import React from 'react'
import Background from '../../Components/background/Background'
import Container from '../../Components/container/Container'
import './ForgotPassword.scss'

const ForgotPassword = () => {
  return (
    <div className='forgotPassword'>
      <Background/>
      <form action='/' className='loginForm'>
        <label for="username">Email</label>
        <input type="text" placeholder="Enter Email" id="username"/>
        <button>Send Link</button>
    </form>
    </div>
  )
}

export default ForgotPassword
