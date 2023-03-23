import { useContext, useEffect, useState } from 'react';
import './LoginRegistration.scss'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../Components/Loader/Loader'

const LoginRegistration = () => {
  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
  }, []);

  const [credentials, setCredentials] = useState({
	email: undefined,
	password: undefined,
  });
const [credentials1, setCredentials1] = useState({
	email: undefined,
	password: undefined,
	username: undefined,
	mobileno:undefined,
  });

  const [load,setLoading] = useState(false)
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
	setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleChange1 = (e) => {
	setCredentials1((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
	e.preventDefault();
	dispatch({ type: "LOGIN_START" });
	try {
	  const res = await axios.post("/auth/user/login", credentials);
	  
		dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
		navigate("/");
	  
	} catch (err) {
	  dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
	}
  };

  
const [error1,setError1] = useState(null);
  const handleClick1 = async (e) => {
	e.preventDefault();
	setLoading(true)
	try {
	  await axios.post("/auth/user/register", credentials1);
	  setError1(null)
	  setLoading(false)
	  navigate("/checkEmail")
	  
	} catch (err) {
		setLoading(false)
		setError1(err.response.data.message)
		console.log(err)
	}
  };

  return (
    <div className='loginContainer'>
		{(load || loading) && <Loader/>}
<div class="container" id="container">
	<div class="form-container sign-up-container">
		<form action="/" className='form1'>
			<h1 className='h1'>Create Account</h1>
			<input type="text" placeholder="Name" id="username" onChange={handleChange1}/>
			<input type="number" placeholder="Mobile No" id="mobileno" onChange={handleChange1} pattern="[0-9]{10}"/>
			<input type="email" placeholder="Email" id="email" onChange={handleChange1}/>
			<input type="password" placeholder="Password" id="password" onChange={handleChange1}/>
			{error1 && <span style={{margin:'10px 0px'}}>{error1}</span>}
			<button className='btn1' onClick={handleClick1}>Sign Up</button>
			
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="/" className='form1'>
			<h1 className='h1'>Sign in</h1>
			<input type="email" placeholder="Email" id="email" onChange={handleChange}/>
			<input type="password" placeholder="Password" id="password" onChange={handleChange}/>
			{error && <span style={{margin:'10px 0px'}}>{error.message}</span>}
			<button className='btn1' onClick={handleClick}>Sign In</button>
			<Link to="/ForgotPassword" className='a'><a className='a'>Forgot your password?</a></Link>
			
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1 className='h1'>Welcome Back!</h1>
				<p className='para'>To keep connected with us please login with your personal info</p>
				<button class="ghost btn1" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1 className='h1'>Hello, Friend!</h1>
				<p className='para'>Enter your personal details and start journey with us</p>
				<button class="ghost btn1" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>

    </div>
  )
}

export default LoginRegistration
