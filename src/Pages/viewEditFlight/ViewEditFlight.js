import { useState } from "react";
import './ViewEditFlight.scss'
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

const ViewEditRoom = () => {
    const [editable,setEditable] = useState(false);
    const [options, setOptions] = useState({
      checkIn: 5,
      cabin: 0,
    });
  
    const [openOption,setOpenOpton] = useState(false);
    const handleOption = (name, operation) => {
      setOptions((prev) => {
        return {
          ...prev,
          [name]: operation === "i" ? options[name] + 5 : options[name] - 5,
        };
      });
    };

    const r_id = useParams()
    const {data} = useFetch(`/flight/find/${r_id.id}`)

    let d = data.arrival

  return (
    <div className="viewRoomContainer">
      <h1>Flight Detail:</h1>
      
      <div className="addRoomWrapper">
        <div className="right">
          <div className="bottom">
            <div className="item">
              <label htmlFor="">Plane Name : </label>
              <input type="text" placeholder={data.planename} disabled={!editable}/>
            </div>
            <div className="item">
              <label htmlFor="">Source City : </label>
              <input type="text"  placeholder={data.sourcecity} disabled={!editable}/>
            </div>
            <div className="item">
              <label htmlFor="">Destination City : </label>
              <input type="text" placeholder={data.destinationcity} disabled={!editable}/>
            </div>
            <div className="item">
              <label htmlFor="">Departure Date (UTC) : </label>
              <input type="text" id="dDate" defaultValue = { d && data.departure.slice(0,10) } disabled={!editable}/>
            </div>
            <div className="item">
              <label htmlFor="">Arrival Date (UTC) : </label>
              <input type="text" name="aDate"disabled={!editable} defaultValue = {d && data.arrival.slice(0,10)}/>
            </div>
            <div className="item">
              <label htmlFor="">Departure Time (UTC) : </label>
              <input type="text" id="dDate" defaultValue = {d && data.departure.slice(11,16) } disabled={!editable}/>
            </div>
            <div className="item">
              <label htmlFor="">Arrival Time (UTC) : </label>
              <input type="text" name="aDate"disabled={!editable} defaultValue = {d&&data.arrival.slice(11,16)}/>
            </div>
            <div className="item">
              <label htmlFor="">Capacity: </label>
              <input type="number" min={0} placeholder={data.seats} disabled={!editable}/>
            </div>
            <div className="item">
              <label htmlFor="">Rate : </label>
              <input type="number" min={0} placeholder={data.rate} disabled={!editable}/>
            </div>

            <div className="item">
              <label htmlFor="">Weightage Allowance : </label>
              <span className="allowance" style={editable ?{ paddingLeft : "10px", color:"gray",cursor:"pointer"}:{ paddingLeft : "10px", color:"gray",cursor:"default"}} onClick={()=> editable && setOpenOpton(!openOption)}>{`${data.checkin} kg check-in , ${data.cabin} kg cabin  `}</span>
              {openOption && <div className="options">
                <div className="optionItem">
                  <span className="text">Check-in</span>
                  <div className="optionCounter">
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("checkIn", "d")}
                      disabled={options.checkIn <= 5}
                    >
                      -5
                    </button>
                    <span className="counter">{options.checkIn} kg</span>
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("checkIn", "i")}
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
            
            { editable && <div className="item" style={{width : "100%"}}> 
              <button className="saveButton">Save</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEditRoom
