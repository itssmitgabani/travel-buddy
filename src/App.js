import { Routes, Route, useLocation, Navigate } from "react-router-dom"; 
import './App.css';
import Login from './Pages/login/Login';
import Dashboard from './Pages/dashboard/Dashboard';
import Hotel from './Pages/hotel/Hotel';
import Airline from './Pages/airline/Airline';
import User from './Pages/user/User';
import Coupon from './Pages/coupon/Coupon';
import Feedback from './Pages/feedback/Feedback';
import ForgotPassword from './Pages/forgotPassword/ForgotPassword';
import NoPage from './Pages/noPage/NoPage';
import HotelBooking from "./Pages/hotelBooking/HotelBooking";
import FlightBooking from "./Pages/flightBooking/FlightBooking";
import SideBar from "./Components/sidebar/SideBar";
import NavBar from "./Components/navbar/NavBar";
import AdminProfile from "./Pages/adminProfile/AdminProfile";
import ResetPassword from "./Pages/resetpassword/resetPassword";
import View from "./Pages/view/View";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import HotelPayment from "./Pages/HotelPayment/HotelPayment";
import AirlinePayment from "./Pages/AirlinePayment/AirlinePayment";

function App() {
  const location = useLocation();
  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(!user){
      console.log(user)
      return <Navigate to='/login'/>
    }
    
    return children
  }
  return (
    
    <div className='dashboard'>
        {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword"&& location.pathname !== "/passwordReset") && <SideBar/>}
      
      <div className="homeContainer">
      {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword"&& location.pathname !== "/passwordReset") && <NavBar/>}
        <Routes>
        <Route path="/">
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
          <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          
          <Route path="hotels" >
            <Route index element={<ProtectedRoute><Hotel type="hotel"/></ProtectedRoute>}/>
            <Route path=":id" element={<ProtectedRoute><View type="hotel"/></ProtectedRoute>}/>  
            <Route path="activated" element={<ProtectedRoute><Hotel type="hotelA"/></ProtectedRoute>}/>  
            <Route path="deactivated" element={<ProtectedRoute><Hotel type="hotelD"/></ProtectedRoute>}/>  
          </Route> 
          <Route path="airlines" >
            <Route index element={<ProtectedRoute><Airline type="airline"/></ProtectedRoute>}/>
            <Route path=":id" element={<ProtectedRoute><View type="airline"/></ProtectedRoute>}/>  
            <Route path="activated" element={<ProtectedRoute><Airline type="airlineA"/></ProtectedRoute>}/>  
            <Route path="deactivated" element={<ProtectedRoute><Airline type="airlineD"/></ProtectedRoute>}/>  
          </Route> 
          <Route path="users" >
            <Route index element={<ProtectedRoute><User type="user"/></ProtectedRoute>}/>
            <Route path=":id" element={<ProtectedRoute><View type="user"/></ProtectedRoute>}/>  
            <Route path="activated" element={<ProtectedRoute><User type="userA"/></ProtectedRoute>}/>  
            <Route path="deactivated" element={<ProtectedRoute><User type="userD"/></ProtectedRoute>}/>  
          </Route>
          
          <Route path="coupon" element={<ProtectedRoute><Coupon /></ProtectedRoute>} />
          <Route path="bookings" >
            <Route path="hotel" element={<ProtectedRoute><HotelBooking /></ProtectedRoute>} />
            <Route path="flight" element={<ProtectedRoute><FlightBooking /></ProtectedRoute>} />
          </Route>
          <Route path="payment" >
            <Route path="hotel" element={<ProtectedRoute><HotelPayment /></ProtectedRoute>} />
            <Route path="airline" element={<ProtectedRoute><AirlinePayment /></ProtectedRoute>} />
          </Route>
          <Route path="feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="passwordReset" element={<ResetPassword />} />
          <Route path="*" element={<ProtectedRoute><NoPage /></ProtectedRoute>} />
        </Route>
      </Routes>
        </div>
        </div>
      
      
  );
}

export default App;
