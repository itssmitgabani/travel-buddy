import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './Components/navbar/NavBar';
import SideBar from './Components/sidebar/SideBar';
import AddNew from './Pages/addnew/AddNew';
import Bookings from './Pages/Bookings/Bookings';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import Dashboard from './Pages/Dashboard/Dashboard';
import Feedback from './Pages/Feedback/Feedback';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import AirlineProfile from './Pages/AirlineProfile/AirlineProfile';
import LoginRegistration from './Pages/LoginRegistration/LoginRegistration';
import NoPage from './Pages/NoPage/NoPage';
import Flights from './Pages/Flights/Flights';
import ViewEditRoom from './Pages/viewEditFlight/ViewEditFlight';
import CheckEmailMessage from '../../travel-buddy-airline/src/Pages/checkEmailMessage/CheckEmailMessage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import ViewBooking from './Pages/ViewBooking/ViewBooking';

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
    if(user && (user.airlinename === " " ||user.username === "")){
      navigate("/profile");
      alert("complete hotel profile")
    }
    
    return children
  }
  return (
    <div className='dashboard'>
        {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword" && location.pathname !== "/checkEmail" )&& <SideBar/>}
      <div className="homeContainer">
      {(location.pathname !== "/login" && location.pathname !== "/ForgotPassword" && location.pathname !== "/checkEmail" )&& <NavBar/>}
        <Routes>
        <Route path="/">
        <Route path="login" element={<LoginRegistration />} />
        <Route path="checkEmail" element={<CheckEmailMessage />} />
        <Route path="profile" element={<ProtectedRoute><AirlineProfile /></ProtectedRoute>} />
          <Route index element={<ProtectedRoute><DetailsRoute><Dashboard/></DetailsRoute></ProtectedRoute>}/>
          <Route path="dashboard" element={<ProtectedRoute><DetailsRoute><Dashboard/></DetailsRoute></ProtectedRoute>}/>
          <Route path='flights'>
          <Route index element={<ProtectedRoute><DetailsRoute><Flights /></DetailsRoute></ProtectedRoute>}/>
          <Route path='add' element={<ProtectedRoute><DetailsRoute><AddNew/></DetailsRoute></ProtectedRoute>}/>
          <Route path='view/:id' element={<ProtectedRoute><DetailsRoute><ViewEditRoom/></DetailsRoute></ProtectedRoute>}/>
          </Route>

          <Route path="bookings">
          <Route index element={<ProtectedRoute><DetailsRoute><Bookings /></DetailsRoute></ProtectedRoute>}/>
            <Route path=':id' element={<ProtectedRoute><DetailsRoute><ViewBooking/></DetailsRoute></ProtectedRoute>}/>
          </Route> 
          <Route path="feedback" element={<ProtectedRoute><DetailsRoute><Feedback /></DetailsRoute></ProtectedRoute>} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="changePassword" element={<ProtectedRoute><DetailsRoute><ChangePassword /></DetailsRoute></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><NoPage /></ProtectedRoute>} />
        </Route>
      </Routes>
        </div>
        </div>

  );
}

export default App;
