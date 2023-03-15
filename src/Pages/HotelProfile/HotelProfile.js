import { useContext, useState } from "react";
import "./HotelProfile.scss";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AuthContext } from "../../context/AuthContext.js";
import axios from 'axios'

const HotelProfile = () => {
  const {user} = useContext(AuthContext)
  const [editable, setEditable] = useState(false);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    user.img
  );
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const [credentials, setCredentials] = useState({});

    const handleChange1 = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      console.log(credentials)
      };
  const handleclick = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","upload")

    try{
      if(file !== null){
        console.log(file)
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dsdcdnhiv/image/upload",data)
      
      const {url} = uploadRes.data
      const updatedData = {
        img:url,
      }
      
      await axios.put(`/hotels/updateImg/${user._id}`,updatedData)

      }
      await axios.put(`/hotels/update/${user._id}`,credentials)

      
      const newData = await axios.get(`/hotels/find/${user._id}`)
      localStorage.setItem("hotel", JSON.stringify(newData.data));
    }catch(err){
      console.log(err)
    }
    window.location.reload();

  };
  return (
    <div className="pContainer">
      <div className="top">
        <h1>Hotel Profile</h1>
        <button
          className="editable"
          onClick={() => setEditable(!editable)}
          style={
            editable
              ? { color: "white", backgroundColor: "red" }
              : { color: "green", backgroundColor: "greenyellow" }
          }
        >
          {editable ? <CloseIcon /> : <EditIcon />}
        </button>
      </div>
      <div className="bottom">
        <div className="left">
          <h3>Profile Picture:</h3>
          <div className="image">
            <div className="circle-1"></div>
            <div className="circle-2"></div>
            <img src={photoURL} width="70" height="70" alt="Jessica Potter" />
            {editable && (
              <>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="fileInput"
                  onChange={handleChange}
                />
                <label htmlFor="fileInput" className="editable">
                  {" "}
                  <AddPhotoAlternateIcon />
                </label>
              </>
            )}
          </div>
        </div>
        <div className="right">
          <h3>Profile Details:</h3>
          <div className="hotelDetailContainer">
            <div className="item">
              Hotel Name
              <input type="text" placeholder={user.hotelname} id="hotelname"onChange={handleChange1} disabled={!editable} className={user.hotelname === " " ? "null" : "" }/>
            </div>
            <div className="item">
              Email
              <input
                type="text"
                placeholder={user.email}
                id="email"
                disabled
              />
            </div>
            <div className="item">
              Owner Name
              <input type="text" placeholder={user.username} id="username" onChange={handleChange1} disabled={!editable} className={user.username === " " ? "null" : "" }/>
            </div>
            <div className="item">
              City
              <input type="text" placeholder={user.city} id="city" onChange={handleChange1} disabled={!editable} className={user.city === " " ? "null" : "" }/>
            </div>
            <div className="item">
              Location Link
              <input
                type="text"
                placeholder={user.locationlink}
                id="locationlink"
                disabled={!editable}
                onChange={handleChange1} 
                className={user.locationlink === " " ? "null" : "" }
              />
            </div>
            <div className="item">
              Address
              <input
                type="text"
                placeholder={user.address}
                id="address"
                disabled={!editable}
                onChange={handleChange1} 
                className={user.address === " " ? "null" : "" }
              />
            </div>
            <div className="item">
              Check-in time
              <input
                type="time"
                id="checkin"
                disabled={!editable}
                onChange={handleChange1} 
                className={user.checkin === " " ? "null" : "" }
                defaultValue={user.checkin}
              />
            </div>
            <div className="item">
              Check-out time
              <input
                type="time"
                id="checkout"
                disabled={!editable}
                onChange={handleChange1} 
                className={user.checkout === " " ? "null" : "" }
                defaultValue={user.checkout}
              />
            </div>
            <div className="item">
              Category
              <select id="category" disabled={!editable} onChange={handleChange1} >
                <option value="5" selected={user.category===5? true: false}>5 &#10030;</option>
                <option value="4" selected={user.category===4? true: false}>4 &#10030;</option>
                <option value="3" selected={user.category===3? true: false}>3 &#10030;</option>
                <option value="2" selected={user.category===2? true: false}>2 &#10030;</option>
                <option value="1" selected={user.category===1? true: false}>1 &#10030;</option>
              </select>
            </div>

            <div className="item" style={{ width: "700px" }}>
              Description
              <textarea
                cols="30"
                rows="10"
                style={{ resize: "none" }}
                placeholder={user.description}
                id="description"
                disabled={!editable}
                onChange={handleChange1} 
                className={user.description === " " ? "null" : "" }
              ></textarea>
            </div>
            {editable && (
              <div className="item" style={{ width: "700px" }}>
                <button className="saveButton" onClick={handleclick}>save</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelProfile;
