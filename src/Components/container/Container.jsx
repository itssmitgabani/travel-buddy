import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import axios from 'axios';
import './Container.scss'
import Loader from '../Loader/Loader.jsx';
const Container = () => {

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/admin/login`, credentials);
      
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (<>
    {loading&&<Loader/>}
    <form action='/' className='loginForm'>
      
      
        <h3>Login Here</h3>

        <label for="email">Email</label>
        <input type="text" placeholder="Email" id="email" onChange={handleChange}/>

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" onChange={handleChange}/>
        {error && <div style={{alignItems:'center',display:'flex',justifyContent:'center',marginTop:'15px'}}><span>{error.message}</span></div>}

        <button disabled={loading} onClick={handleClick} >Log In</button>
        <div className='ForgotPassword'>  
        <a href="/ForgotPassword">Forgot your password?</a>
        </div>
    </form>
    </>
  )
}

export default Container
