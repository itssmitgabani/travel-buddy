import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import './HotelSearch.scss'
import { addDays, format } from 'date-fns';
import SearchItem from '../../Components/SearchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import Loader from '../../Components/Loader/Loader'
import Noresult from '../../Images/No.png'

const HotelSearch = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [sort, setSort] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/room?city=${destination}&min=${min || 0 }&max=${max || 100000}&sort=${sort || 1}`
  );
    
  const handleClick = () => {
    reFetch();
  };
  return (
    <div>
      {loading && <Loader/>}
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" value={destination}/>
            </div>
            <div className="lsItem">
              <label>Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                
              </div>
              <label>Sort</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    price Low to High
                  </span>
                  <input
                    type="radio" name='sort' value='1'
                    className="lsOptionInput"
                    onChange={(e) => setSort(e.target.value)}
                    defaultChecked
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    price High to Low
                  </span>
                  <input
                    type="radio" name='sort' value='-1'
                    className="lsOptionInput"
                    onChange={(e) => setSort(e.target.value)}
                  />
                </div>
                
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          
          <div className="listResult">
            {
              data.length === 0 && <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column'}}>
                
                <h2>No Result Found!</h2>
                </div>
            }
          {data.map((item) => (
                  <SearchItem item={item} key={item._id} dates={dates}/>
                ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HotelSearch
