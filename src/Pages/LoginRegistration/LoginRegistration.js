import './LoginRegistration.scss'
import {Link} from 'react-router-dom'
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import axios from 'axios';

const LoginRegistration = () => {
	
	const [credentials, setCredentials] = useState({
		email: undefined,
		password: undefined,
	  });
	const [credentials1, setCredentials1] = useState({
		email: undefined,
		password: undefined,
		username: undefined,
	  });
	
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
		  const res = await axios.post("/auth/hotel/login", credentials);
		  
			dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
			navigate("/");
		  
		} catch (err) {
		  dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
		}
	  };

	  
  const [error1,setError1] = useState(null);
	  const handleClick1 = async (e) => {
		e.preventDefault();
		try {
		  await axios.post("/auth/hotel/register", credentials1);
		  setError1(null)
		  navigate("/checkEmail")
		  
		} catch (err) {
			setError1(err.response.data.message)
			console.log(error1)
		}
	  };
	
	
  return (
    <div className="container">
    <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div className="signup">
				<form action='/'>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" id="username" placeholder="User name"onChange={handleChange1} required/>
					<input type="email" id="email" placeholder="Email"onChange={handleChange1} required/>
					<input type="password" id="password" placeholder="Password"onChange={handleChange1} required/>
					<button disabled={loading} onClick={handleClick1}>Sign up</button>
					{error1 && <span>{error1}</span>}
				</form>
			</div>

			<div className="login">
				<form action='/'>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="email" id="email" placeholder="Email" onChange={handleChange} required/>
					<input type="password" id="password" placeholder="Password"onChange={handleChange} required/>
					<button disabled={loading} onClick={handleClick} >Login</button>
					{error && <span>{error.message}</span>}
          <div className='ForgotPassword'>
        <a href="/ForgotPassword">Forgot your password?</a>
        </div>
				</form>
			</div>
</div>
</div>
  )
}

export default LoginRegistration
