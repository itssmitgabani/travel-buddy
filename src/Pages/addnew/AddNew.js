import "./AddNew.scss";
import { useContext, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AddNew = () => {
  
  const {user} = useContext(AuthContext)
  const [selectedImage, setSelectedImage] = useState([]);
  const [files, setFiles] = useState("");
  const onSelectedFile = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setFiles((prev) => ([...prev,  e.target.files]));
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setSelectedImage((previousImages) => previousImages.concat(imagesArray));
  };
  const [options, setOptions] = useState({
    maxadults: 1,
    maxchildren: 0,
  });

  const [openOption,setOpenOpton] = useState(false);
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  

  const [info, setInfo] = useState({});

  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
      files.map(async (file) => {
          const data = new FormData();
          data.append("file", file[0]);
          data.append("upload_preset", "upload");
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dsdcdnhiv/image/upload",data)

          const { url } = uploadRes.data;
          return url;
        })
      );
      const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
      const Amenities = amenities.split(",");
      const newhotel = {
        ...info,
        ...options,
        img:list,
        amenities:Amenities,
        roomnumbers:roomNumbers,
        h_id:user._id
      };
      await axios.post('/room/add',newhotel)
      
      const newData = await axios.get(`/hotels/find/${user._id}`)
      localStorage.setItem("hotel", JSON.stringify(newData.data));
    window.location.reload();
    } catch (err) {console.log(err)}
  };
  return (
    <div className="addRoomContainer">
      <h1>Add Room Details</h1>
      <div className="addRoomWrapper">
        <div className="left">
          <div className="top">
            <h3>Images:</h3>
          </div>
          <div className="bottom">
            {selectedImage.length < 6 && (
              <div>
                <label>
                  + add images
                  <br />
                  <span>Upto 6 images</span>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    onChange={onSelectedFile}
                  />
                </label>
              </div>
            )}
            <div className="imageContainer">
              {selectedImage &&
                selectedImage.map((image, index) => {
                  return (
                    <div className="image">
                      <img src={image} alt="" />
                      <p>{index + 1}</p>
                      <button
                        className="deleteButton"
                        onClick={() =>{
                          setSelectedImage(
                            selectedImage.filter((e) => e !== image)

                          )
                          files.splice(index,1)}
                        }
                      >
                        <DeleteForeverOutlinedIcon />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="right" style={{borderLeft : '1px solid lightgray'}}>
          <div className="top">
            <h3>Details:</h3>
          </div>
          <div className="bottom">
            <div className="item">
              <label htmlFor="">Room Category : </label>
              <input type="text" id="category"
                    onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Room Numbers : </label>
              <input type="text" placeholder="separate by ',' (comma)"id="roomnumbers" onChange={(e) => setRooms(e.target.value)}/>
            </div>
            <div className="item">
              <label htmlFor="">Price : </label>
              <input type="number" min={0} id="price"
                    onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Allowance : </label>
              <span className="allowance" style={{ cursor: "pointer" , paddingLeft : "10px", color:"gray"}} onClick={()=>setOpenOpton(!openOption)}>{`${options.maxadults} adults , ${options.maxchildren} children  `}</span>
              {openOption && <div className="options">
                <div className="optionItem">
                  <span className="text">Adult</span>
                  <div className="optionCounter">
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("maxadults", "d")}
                      disabled={options.maxadults <= 1}
                    >
                      -
                    </button>
                    <span className="counter">{options.maxadults}</span>
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("maxadults", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionItem">
                  <span className="text">Children</span>
                  <div className="optionCounter">
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("maxchildren", "d")}
                      disabled={options.maxchildren <= 0}
                    >
                      -
                    </button>
                    <span className="counter">{options.maxchildren}</span>
                    <button
                      className="CounterButton"
                      onClick={() => handleOption("maxchildren", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>}
            </div>
            <div className="item">
              <label htmlFor="">Amenities : </label>
              <input type="text" placeholder="separate by ',' (comma)" id="amenities"onChange={(e) => setAmenities(e.target.value)}/>
            </div>
            <div className="item" style={{width : "100%"}}> 
              <button className="addButton" onClick={handleclick}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
