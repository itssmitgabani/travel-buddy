import { TextField } from "@mui/material";
import { keys } from "@mui/system";
import { hotelRows } from "../../dataTableSource";
import "./View.scss";
import useFetch from "../../hooks/useFetch.js"
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const View = ({type}) => {

  
  let url = ""
  let token = 0 
  let { id } = useParams();
  switch (type) {
    case "hotel":
        url = `/hotels/find/${id}`;
        token = 1
        break
    case "airline":
        url = `/airlines/find/${id}`;
        token = 2
        break
    case "user":
        url = `/users/find/${id}`;
        token = 3
        break
        default:
    }

  const {data , loading,error} = useFetch(url)
  
  const hotelD = data;

  const Hotel = () => {
    return (
      <div className="container">
        <img src={data.img} style={{width:"200px",height:"200px"}}></img> <br/><br/><br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>id :</p>
              <p className="pad">{data._id}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>username :</p>
              <p className="pad">{data.username}</p>  <br/> 
              <p style={{'color':'GrayText',fontWeight:"700"}}>email :</p>
              <p className="pad">{data.email}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>hotel name :</p>
              <p className="pad">{data.hotelname}</p><br/>   
              <p style={{'color':'GrayText',fontWeight:"700"}}>city :</p>
              <p className="pad">{data.city}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>location link :</p>
              <p className="pad">{data.locationlink}</p>  <br/> 
              <p style={{'color':'GrayText',fontWeight:"700"}}>address :</p>
              <p className="pad">{data.address}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>category :</p>
              <p className="pad">{data.category}</p>&#9733;   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>description :</p>
              <p className="pad">{data.description}</p>  <br/> 
              <p style={{'color':'GrayText',fontWeight:"700"}}>status :</p>
              <p className="pad">{data.status?"Activated":"De-activated"}</p> <br/>  
      </div>
      
    )
  }
  const Airline = () => {
    return (
      <div className="container">
        <img src={data.img} style={{width:"200px",height:"200px"}}></img> <br/><br/><br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>id :</p>
              <p className="pad">{data._id}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>username :</p>
              <p className="pad">{data.username}</p>  <br/> 
              <p style={{'color':'GrayText',fontWeight:"700"}}>email :</p>
              <p className="pad">{data.email}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>airline name :</p>
              <p className="pad">{data.airlinename}</p><br/>   
              <p style={{'color':'GrayText',fontWeight:"700"}}>status :</p>
              <p className="pad">{data.status?"Activated":"De-activated"}</p> <br/>  
      </div>
      
    )
  }
  const User = () => {
    return (
      <div className="container">
        <img src={data.length === undefined && data.details.img} style={{width:"200px",height:"200px"}}></img> <br/><br/><br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>id :</p>
              <p className="pad">{data.length === undefined && data.details._id}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}>username :</p>
              <p className="pad">{data.length === undefined && data.details.username}</p>  <br/> 
              <p style={{'color':'GrayText',fontWeight:"700"}}>email :</p>
              <p className="pad">{data.length === undefined && data.details.email}</p>   <br/>
              <p style={{'color':'GrayText',fontWeight:"700"}}> mobile no :</p>
              <p className="pad">{data.length === undefined && data.details.mobileno}</p><br/>   
              <p style={{'color':'GrayText',fontWeight:"700"}}>city :</p>
              <p className="pad">{data.length === undefined && data.details.city}</p>   <br/>
              
              <p style={{'color':'GrayText',fontWeight:"700"}}>status :</p>
              <p className="pad">{data.length === undefined && data.details._id?"Activated":"De-activated"}</p> <br/>  
      </div>
      
    )
  }
  return (
    <div className="view">
      {loading && <Loader/>}
      <h1>information</h1>
          {token===1 &&
            <Hotel/>
          }
          {token===2 &&
            <Airline/>
          }
          {token===3 &&
            <User/>
          }
      
    </div>
  );
};

export default View;
