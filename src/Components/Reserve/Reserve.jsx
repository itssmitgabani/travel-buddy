import './Reserve.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const Reserve = ({ setOpen, hotelId ,setRoom , item }) => {
  console.log(item)
    const [selectedRooms, setSelectedRooms] = useState([]);
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
      };
    const handleClick =  () => {
            setRoom(selectedRooms)
          setOpen(false);
        
      };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        
          <div className="rItem">
            
            <div className="rSelectRooms">
            
                {item.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        
        <button  className="rButton" onClick={handleClick}>
          Select Room
        </button>
      </div>
    </div>
  )
}

export default Reserve
