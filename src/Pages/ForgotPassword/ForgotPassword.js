import './ForgotPassword.scss'

const ForgotPassword = () => {
  return (
    <div className='fPasswordContainer'>
    <div class="container" id="container">
      
      <div class="form-container sign-in-container">
        <form action="/" className='form1'>
          <h1 className='h1'>Forgot Password</h1>
          <input type="email" placeholder="Email" />
          <button className='btn1'>send link</button>
        </form>
      </div>
    </div>
    
        </div>
  )
}

export default ForgotPassword
