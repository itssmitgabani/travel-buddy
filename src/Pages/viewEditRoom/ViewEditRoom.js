import { useContext, useEffect, useState } from "react";
import './ViewEditRoom.scss'
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loader from '../../Components/Loader/Loader'

const ViewEditRoom = () => {
  
  const {user} = useContext(AuthContext)
  const r_id = useParams()
  const {data , loading} = useFetch(`/room/find/${r_id.id}`)
  const [img,setImg] = useState(data.img)
  const [load,setLoading] = useState(false)
    const [editable,setEditable] = useState(false);
    const [selectedImage, setSelectedImage] = useState([data.img]);
    const onSelectedFile = (e) => {
      const selectedFiles = e.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      setSelectedImage((previousImages) => previousImages.concat(imagesArray));
      setImg((previousImages) => previousImages.concat(selectedFiles));
    };
    const [options, setOptions] = useState({maxadults: data.maxadults,
      maxchildren: data.maxchildren,});
    
  useEffect(() => { setOptions({maxadults: data.maxadults,
    maxchildren: data.maxchildren,})
  setImg(data.img)
  setSelectedImage(data.img)
  }, [data] )
    
  
    const [openOption,setOpenOpton] = useState(false);
    const handleOption = (name, operation) => {
      setOptions((prev) => {
        return {
          ...prev,
          [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
        };
      });
    };
   // const [img,setimg] = useState()
    const room = data.roomnumbers
    const ame = data.amenities
    const [info, setInfo] = useState({});

    const [rooms, setRooms] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const handleChange = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleclick = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        const list = await Promise.all(
        img.map(async (file) => {
          console.log(typeof(file))
          if(typeof(file)==="object"){
            const data = new FormData();
            data.append("file", file[0]);
            data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dsdcdnhiv/image/upload",data)
  
            const { url } = uploadRes.data;
            return url;}else{
              return file
            }
          })
          
        );
        let roomNumbers , Amenities ,newhotel
        if(rooms.length > 0){
            
           roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        }
        if(amenities.length > 0){
            
          Amenities = amenities.split(",");
       }
        if(roomNumbers && Amenities){
         newhotel = {
          ...info,
          ...options,
          img:list,
          amenities:Amenities,
          roomnumbers:roomNumbers,
          h_id:user._id
        };
      }else if (roomNumbers){
        newhotel = {
          ...info,
          ...options,
          img:list,
          roomnumbers:roomNumbers,
          h_id:user._id
        };
        }
      else if (Amenities){
        newhotel = {
          ...info,
          ...options,
          img:list,
          amenities:Amenities,
          h_id:user._id
        };
        } else {
          newhotel = {
            ...info,
            ...options,
            img:list,
            h_id:user._id
          };
        }

      await axios.put(`/room/update/${r_id.id}`,newhotel)
      setLoading(false)
      window.location.reload()
      } catch (err) {console.log(err)
      setLoading(false)}
    };
  return (
    <div className="viewRoomContainer">
      {(loading || load) && <Loader/> }
      <h1>Room Details</h1>
      <button className="editable" onClick={()=>setEditable(!editable)} style={editable ? {color:"white",backgroundColor:"red"}:{color:"green" , backgroundColor:"greenyellow"}}>
        {editable ? <CloseIcon/> : <EditIcon />}
      </button>
      <div className="addRoomWrapper">
        <div className="left">
          <div className="top">
            <h3>Images:</h3>
          </div>
          <div className="bottom">
            {editable && selectedImage.length < 6   &&(
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
                      {editable && <button
                        className="deleteButton"
                        onClick={() =>{
                          setSelectedImage(
                            selectedImage.filter((e) => e !== image)
                          )
                          
                          img.splice(index,1)
                        }}
                      >
                        <DeleteForeverOutlinedIcon />
                      </button>}
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
              <input type="text" placeholder={data.category} disabled={!editable} id="category"onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Room Numberd : </label>
              <input type="text" placeholder={room && data.roomnumbers.map((item)=>item.number)} disabled={!editable} onChange={(e) => setRooms(e.target.value)}/>
            </div>
            <div className="item">
              <label htmlFor="">Price : </label>
              <input type="number" min={0} placeholder={data.price} disabled={!editable} id="price"onChange={handleChange}/>
            </div>
            <div className="item">
              <label htmlFor="">Allowance : </label>
              <span className="allowance" style={editable ?{ paddingLeft : "10px", color:"gray",cursor:"pointer"}:{ paddingLeft : "10px", color:"gray",cursor:"default"}} onClick={()=> editable && setOpenOpton(!openOption)}> {`${options.maxadults} adults , ${options.maxchildren} children  `} </span>
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
              <input type="text" placeholder={ame  && data.amenities.map((item)=>item)} id="amenities" disabled={!editable}onChange={(e) => setAmenities(e.target.value)}/>
            </div>
            {editable && <div className="item" style={{width : "100%"}}> 
              <button className="saveButton" onClick={handleclick}>Save</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEditRoom
