import "./AddNew.scss";
import { useContext, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import Loader from '../../Components/Loader/Loader'
import {useNavigate} from "react-router-dom"

const AddNew = () => {

  const [options, setOptions] = useState({
    checkin: 5,
    cabin: 0,
  });
  const [err, setErr] = useState(false);

  const [openOption,setOpenOpton] = useState(false);
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 5 : options[name] - 5,
      };
    });
  };
  
  const {user} = useContext(AuthContext)
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate()
  const handleclick = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const newflight = {
        ...info,
        ...options,
        a_id:user._id,
        availableSeats:info.seats
      };
      await axios.post('/flight/add',newflight)
      
      const newData = await axios.get(`/airlines/find/${user._id}`)
      localStorage.setItem("airline", JSON.stringify(newData.data));
      setLoading(false)
     navigate("/flights")
    } catch (error) {console.log(error)
      setLoading(false)
    setErr(true)}
  };
  return (
    <div className="addRoomContainer">
      {loading && <Loader/> }
      <h1>Add Flight Details</h1>
      <div className="addRoomWrapper">
        <div className="right">
          <div className="bottom">
            <div className="item">
              <label htmlFor="">Plane Name : </label>
              <input type="text" id="planename"onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Source City : </label>
              <input type="text"  id="sourcecity" onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Destination City : </label>
              <input type="text" id="destinationcity"onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Departure Date-Time : </label>
              <input type="datetime-local" id="departure" onSelect={handleChange} min={new Date().toISOString().slice(0,16)} defaultValue = {new Date().toISOString().slice(0,16)}/>
            </div>
            <div className="item">
              <label htmlFor="">Arrival Date-Time : </label>
              <input type="datetime-local" id="arrival" onChange={handleChange} min={info.departure ? info.departure :new Date().toISOString().slice(0, 16)} defaultValue = { info.departure } disabled={ !info.departure}/>
            </div>{console.log(info.departure)}
            <div className="item">
              <label htmlFor="">Weightage Allowance : </label>
              <span className="allowance" style={{ cursor: "pointer" , paddingLeft : "10px", color:"gray"}} onClick={()=>setOpenOpton(!openOption)}>{`${options.checkin} kg check-in , ${options.cabin} kg cabin  `}</span>
              {openOption && <div className="options">
                <div className="optionItem">
                  <span className="text">Check-in</span>
                  <div className="optionCounter">
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("checkin", "d")}
                      disabled={options.checkin <= 5}
                    >
                      -5
                    </button>
                    <span className="counter">{options.checkin} kg</span>
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("checkin", "i")}
                    >
                      +5
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="text">Cabin</span>
                  <div className="optionCounter">
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("cabin", "d")}
                      disabled={options.cabin <= 0}
                    >
                      -5
                    </button>
                    <span className="counter">{options.cabin} kg</span>
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("cabin", "i")}
                    >
                      +5
                    </button>
                  </div>
                </div>
              </div>}
            </div>
            
            <div className="item">
              <label htmlFor="">Capacity: </label>
              <input type="number" min={0} id="seats"onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Rate : </label>
              <input type="number" min={0} id="rate"onChange={handleChange}/>
            </div>

            
            
            <div className="item" style={{width : "100%"}}> 
            {err && <div style={{display:'flex',justifyContent:'center',marginTop:'15px'}}> <span> All Fields required</span></div>}
              <button className="addButton" onClick={handleclick}>Add</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
