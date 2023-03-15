import { useContext } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './Components/navbar/NavBar';
import SideBar from './Components/sidebar/SideBar';
import { AuthContext } from './context/AuthContext';
import AddNew from './Pages/addnew/AddNew';
import Bookings from './Pages/Bookings/Bookings';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import CheckEmailMessage from './Pages/checkEmailMessage/CheckEmailMessage';
import Dashboard from './Pages/Dashboard/Dashboard';
import Feedback from './Pages/Feedback/Feedback';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import HotelProfile from './Pages/HotelProfile/HotelProfile';
import LoginRegistration from './Pages/LoginRegistration/LoginRegistration';
import NoPage from './Pages/NoPage/NoPage';
import Rooms from './Pages/Rooms/Rooms';
import ViewBooking from './Pages/ViewBooking/ViewBooking';
import ViewEditRoom from './Pages/viewEditRoom/ViewEditRoom';

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
  const DetailsRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    if(user && (user.address === " " ||user.checkin === "" ||user.checkout === "" || user.city === " " ||user.description === " " ||user.hotelname === " " ||user.locationlink === " " || user.username === " ")){
      navigate("/profile");
      alert("complete hotel profile")
    }
    
    return children
  }
  return (
    <div className='dashboard'>
        {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword" && location.pathname !== "/checkEmail" )&& <SideBar/>}
      <div className="homeContainer">
      {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword" && location.pathname !== "/checkEmail")&& <NavBar/>}
        <Routes>
        <Route path="/">
        <Route path="login" element={<LoginRegistration />} />
        <Route path="checkEmail" element={<CheckEmailMessage />} />
        <Route path="profile" element={<ProtectedRoute><HotelProfile /></ProtectedRoute>} />
          <Route index element={<ProtectedRoute><DetailsRoute><Dashboard/></DetailsRoute></ProtectedRoute>}/>
          <Route path="dashboard" element={<ProtectedRoute><DetailsRoute><Dashboard/></DetailsRoute></ProtectedRoute>}/>
          <Route path='rooms'>
          <Route index element={<ProtectedRoute><DetailsRoute><Rooms /></DetailsRoute></ProtectedRoute>}/>
          <Route path='add' element={<ProtectedRoute><DetailsRoute><AddNew/></DetailsRoute></ProtectedRoute>}/>
          <Route path='viewEdit/:id' element={<ProtectedRoute><DetailsRoute></DetailsRoute><ViewEditRoom/></ProtectedRoute>}/>
          </Route>
          
          <Route path="bookings">
            
          <Route index element={<ProtectedRoute><DetailsRoute><Bookings /></DetailsRoute></ProtectedRoute>}/>
            <Route path=':id' element={<ProtectedRoute><DetailsRoute><ViewBooking/></DetailsRoute></ProtectedRoute>}/>
          </Route> 
            
          <Route path="feedback" element={<ProtectedRoute><DetailsRoute><Feedback /></DetailsRoute></ProtectedRoute>} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="changePassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><NoPage /></ProtectedRoute>} />
        </Route>
      </Routes>
        </div>
        </div>

  );
}

export default App;
