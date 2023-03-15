import './ForgotPassword.scss'
const ForgotPassword = () => {
  return (
    <div className='forgotPassword'>
      <form action='/' className='loginForm'>

        <label for="username">Email</label>
        <input type="text" placeholder="Enter Email" id="username"/>
        <button>Send Link</button>
    </form>
    </div>
  )
}

export default ForgotPassword
