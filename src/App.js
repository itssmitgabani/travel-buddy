import './App.css';
import {Route, Routes, useLocation} from 'react-router-dom'
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

function App() {

  const location = useLocation();
  return (
    
    <div className="homeContainer">
      {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword" && location.pathname !== "/checkEmail")&& <NavBar/>}
        <Routes>
        <Route path="/">
        <Route path="login" element={<LoginRegistration />} />
        <Route path="checkEmail" element={<CheckEmailMessage />} />
        <Route path="profile" element={<Profile/>} />

        <Route index element={<HomePage/>}/>
          <Route path="home" element={<HomePage/>}/>

          <Route path='hotel'>
          <Route index element={<HotelPage />}/>
          <Route path='search' element={<HotelSearch/>}/>
          <Route path=':id' element={<HotelBook/>}/>
          <Route path='bookingDetail' element={<HotelBookFDetail/>}/>
          </Route>

          <Route path='flight'>
          <Route index element={<FlightPage />}/>
          <Route path='search' element={<FlightSearch/>}/>
          <Route path=':id' element={<FlightBook/>}/>
          </Route>
          
          <Route path="bookings">
            
          <Route index element={<Bookings />}/>
            <Route path=':id' element={<ViewBooking/>}/>
          </Route> 
            
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="feedback" element={<Feedback />} />

          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="ContactUs" element={<ContactUs />} />

          <Route path="forgotPassword" element={<ForgotPassword />} />

          <Route path="changePassword" element={<ChangePassword />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword" && location.pathname !== "/checkEmail")&& <Footer/>}
        </div>

  );
}

export default App;
