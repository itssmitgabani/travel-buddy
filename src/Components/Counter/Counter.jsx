import React from 'react'
import useFetch from '../../hooks/useFetch';

const Counter = ({type}) => {

    let url = ""
    let da
    switch (type) {
        case "u":
            url = "/users/count";
            break

        case "hm":
            url = "/hotels/count"
            break

        case "am":
            url = "/airlines/count"
            break

        case "hb":
            url = "/bookHotel/count";
            break

        case "fb":
            url = "/bookAirline/count"
            break
            default:
    }
    const {data} = useFetch(url)

    switch(type){
    
        case "u":
            da={
                title:"USERS",
                count:data
            };
            break;
        case "hm":
            da={
                title:"HOTELS",
                count:data
            };
            break;
        case "am":
            da={
                title:"AIRLINES",
                count:data
            };
            break;
        case "hb":
            da={
                title:"HOTEL BOOKINGS",
                count:data
            };
            break;
        case "fb":
            da={
                title:"FLIGHT BOOKINGS",
                count:data
            };
            break;
            default:
        }
  return (
    <div className="item">
    <span className="count">{da.count} +</span>
    <span className="title">{da.title}</span>
  </div>
  )
}

export default Counter
