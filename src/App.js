import './App.css';
import NavBar from './Components/NavBar/NavBar';
import LoginRegistration from './Pages/LoginRegistration/LoginRegistration';
import CheckEmailMessage from './Pages/CheckEmailMessage/CheckEmailMessage';
import Profile from './Pages/Profile/Profile';
import HomePage from './Pages/HomePage/HomePage';
import HotelPage from './Pages/HotelPage/HotelPage';
import HotelSearch from './Pages/HotelSearch/HotelSearch';
import HotelBook from './Pages/HotelBook/HotelBook';
import FlightPage from './Pages/FlightPage/FlightPage';
import FlightSearch from './Pages/FlightSearch/FlightSearch';
import FlightBook from './Pages/FlightBook/FlightBook';
import Bookings from './Pages/Bookings/Bookings';
import ViewBooking from './Pages/ViewBooking/ViewBooking';
import Wishlist from './Pages/Wishlist/Wishlist';
import AboutUs from './Pages/AboutUs/AboutUs';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import NoPage from './Pages/NoPage/NoPage';
import Footer from './Components/Footer/Footer';
import ContactUs from './Pages/ContactUs/ContactUs';
import Feedback from './Pages/Feedback/Feedback';
import HotelBookFDetail from './Pages/HotelBookDetail/HotelBookFDetail';
import FlightBookDetail from './Pages/FlightBookDetail/FlightBookDetail';
import ViewFlightBooking from './Pages/ViewFlightBooking/ViewFlightBooking';
import ViewHotelBooking from './Pages/ViewHotelBooking/ViewHotelBooking';
import PasswordReset from './Pages/PasswordReset/PasswordReset';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  
  const location = useLocation();
  const navigate = useNavigate();
  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(!user){
      navigate("/login");
      return <Navigate to='/login'/>
    }
    
    return children
  }
  return (
    
    <div className="homeContainer">
      {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword"&& location.pathname !== "/passwordReset" && location.pathname !== "/checkEmail")&& <NavBar/>}
        <Routes>
        <Route path="/">
        <Route path="login" element={<LoginRegistration />} />
        <Route path="checkEmail" element={<CheckEmailMessage />} />
        <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

        <Route index element={<HomePage/>}/>
          <Route path="home" element={<HomePage/>}/>

          <Route path='hotel'>
          <Route index element={<HotelPage />}/>
          <Route path='search' element={<HotelSearch/>}/>
          <Route path=':id' element={<HotelBook/>}/>
          <Route path='bookingDetail' element={<ProtectedRoute><HotelBookFDetail/></ProtectedRoute>}/>
          </Route>

          <Route path='flight'>
          <Route index element={<FlightPage />}/>
          <Route path='search' element={<FlightSearch/>}/>
          <Route path=':id' element={<FlightBook/>}/>
          <Route path='bookingDetail' element={<ProtectedRoute><FlightBookDetail/></ProtectedRoute>}/>
          </Route>
          
          <Route path="bookings">
            
          <Route index element={<ProtectedRoute><Bookings /></ProtectedRoute>}/>
            <Route path='hotel/:id' element={<ProtectedRoute><ViewHotelBooking/></ProtectedRoute>}/>
            <Route path='flight/:id' element={<ProtectedRoute><ViewFlightBooking/></ProtectedRoute>}/>
          </Route> 
            
          <Route path="wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="feedback" element={<Feedback />} />

          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="ContactUs" element={<ContactUs />} />

          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="passwordReset" element={<PasswordReset />} />

          <Route path="changePassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      {(location.pathname !== "/login" && location.pathname !== "/passwordReset"&& location.pathname !== "/ForgotPassword" && location.pathname !== "/checkEmail")&& <Footer/>}
        </div>

  );
}

export default App;
