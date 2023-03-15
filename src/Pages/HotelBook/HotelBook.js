import "./HotelBook.scss";
import { useContext, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Reserve from "../../Components/Reserve/Reserve";
import useFetch from "../../hooks/useFetch.js";
import {AuthContext} from '../../context/AuthContext.js'
import axios from "axios";

const HotelBook = () => {
  
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(`/room/f/${id}`);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {user} = useContext(AuthContext)

  const [dates, setDates] = useState(
    location.state === null
      ? [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ]
      : location.state.dates
  );

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate) === 0 ? 1 : dayDifference(dates[0].endDate, dates[0].startDate);
 
console.log(days)
  const da = data[0];
  const photos = da && data[0].img;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleChange = async () => {
    await axios.put(`/users/updateWish/${user._id}/${da && data[0]._id}`)
    
    const newData = await axios.get(`/users/find/${user._id}`)
    console.log(newData)
    localStorage.setItem("user", JSON.stringify(newData.data.details));
    alert("success")
    window.location.reload()
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? (da && data[0].img.length) - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === (da && data[0].img.length) - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
 
  const [openDate, setOpenDate] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const maxChildren = selectedRoom ? selectedRoom.length * (da && data[0].maxchildren) : 1;
  const maxAdult = selectedRoom ? selectedRoom.length * (da && data[0].maxadults) : 2;

  const navigate = useNavigate();
  const handleClick = () => {
    if(selectedRoom.length === undefined ||selectedRoom.length === 0 ){
      return alert("selectedRoom")
    }
    navigate("/hotel/bookingDetail",{state:{ data:data[0],days,dates:dates[0],selectedRoom,options}})
  };


  return (
    <div>
      <div className="hotelContainer1">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          
          <h1 className="hotelTitle">{da && data[0].hotel.hotelname}</h1>
          <input id="heart" style={{display:'none'}} type="checkbox" onClick={handleChange}  defaultChecked={da && user.wishlist.includes(da && data[0]._id)}/>

          <label for="heart">❤</label>
          <span className="add">Add to Wishlist</span>

          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{da && data[0].hotel.address}</span>
          </div>
          <span className="hotelDistance">
            {da && data[0].hotel.category} start hotel
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over  &#x20B9;{da && data[0].price} at this property and enjoy
            vacations
          </span>
          <div className="hotelImages">
            {photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
            <h1 className="hotelDesc">Room Type:</h1>
              <h1 className="hotelTitle">{da && data[0].category}</h1>
              <p className="hotelDesc">Location Link</p>
              <a style={{marginLeft:'50px'}} href={da && data[0].hotel.locationlink}>
                {da && data[0].hotel.locationlink}
              </a>

              <div style={{ display: "flex" }}>
                Amenities: 
                {da &&data[0].amenities.map((item) => (
                  <p className="hotelDesc">{item}&emsp;</p>
                ))}
              </div>
              Description:
              <p className="hotelDesc" style={{marginLeft:'50px'}}>{da && data[0].hotel.description}</p>
              <p className="hotelDesc"> Check-in : {da && data[0].hotel.checkin}</p>
              <p className="hotelDesc"> Check-out : {da && data[0].hotel.checkout}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>{da && data[0].price*days* (selectedRoom.length === undefined ||selectedRoom.length === 0 ? 1:selectedRoom.length)} &#x20B9;</b> ({days} nights)
                
              </h2>
              <div className="lsItem">
                <label>Date</label>
                <span onClick={() => setOpenDate(!openDate)}>{`${format(
                  dates ? dates[0].startDate : new Date(),
                  "MM/dd/yyyy"
                )} to ${format(
                  dates ? dates[0].endDate : new Date(),
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    className="daterange"
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
              <div className="lsItem">
                <label>Select Room</label>
                <span onClick={() => setOpenModal(true)}>{selectedRoom && selectedRoom.length} rooms</span>
                {openModal && (
                  <Reserve
                    setOpen={setOpenModal}
                    hotelId={1}
                    setRoom={setSelectedRoom}
                    item={da && data[0].roomnumbers}
                  />
                )}
              </div>
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button
                  disabled={options.adult >= maxAdult}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    disabled={options.children >= maxChildren}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBook;
