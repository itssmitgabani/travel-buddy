import { useContext,useState } from "react";
import "./AirlineProfile.scss";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AuthContext } from "../../context/AuthContext.js";
import axios from 'axios'

const AirlineProfile = () => {
  
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
      };
  const handleclick = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","upload")

    try{
      if(file !== null){
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dsdcdnhiv/image/upload",data)
      
      const {url} = uploadRes.data
      const updatedData = {
        img:url,
      }
      
      await axios.put(`/airlines/updateImg/${user._id}`,updatedData)

      }
      await axios.put(`/airlines/update/${user._id}`,credentials)

      
      const newData = await axios.get(`/airlines/find/${user._id}`)
      localStorage.setItem("airline", JSON.stringify(newData.data));
    }catch(err){
      console.log(err)
    }
    window.location.reload();

  };
  return (
    <div className="pContainer">
      <div className="top">
        <h1>Airline Profile</h1>
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
              Airline Name
              <input type="text" placeholder={user.airlinename} id="airlinename"onChange={handleChange1} disabled={!editable} className={user.airlinename === " " ? "null" : "" }/>
            </div>
            <div className="item">
              Email
              <input
                type="text"
                placeholder={user.email}
                disabled
                id="email"
              />
            </div>
            <div className="item">
              Owner Name
              <input type="text" placeholder={user.username} id="username" onChange={handleChange1} disabled={!editable} className={user.username === " " ? "null" : "" } />
            </div>
            
            {editable && (
              <div className="item" style={{ width: "700px" }}>
                <button className="saveButton"  onClick={handleclick}>save</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirlineProfile;
