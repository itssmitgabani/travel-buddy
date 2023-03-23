import './Reserve.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

const Reserve = ({ setOpen, hotelId ,setRoom ,setRoomNo, item ,setOption,dates}) => {
  console.log(item)
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [selectedRoomsNo, setSelectedRoomsNo] = useState([]);
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        const id = e.target.id;
        setSelectedRooms(
          checked
            ? [...selectedRooms, value]
            : selectedRooms.filter((item) => item !== value)
        );
        setSelectedRoomsNo(
          checked
            ? [...selectedRoomsNo, id]
            : selectedRoomsNo.filter((item) => item !== id)
        );
      };
    const handleClick =  () => {
            setRoom(selectedRooms)
            setRoomNo(selectedRoomsNo)
            setOption({
              adult: 1,
              children: 0,
            })
          setOpen(false);
        
      };

      const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };
      
      const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
      
      const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return !isFound;
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
                    disabled={!isAvailable(roomNumber)}
                    id={roomNumber.number}
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
