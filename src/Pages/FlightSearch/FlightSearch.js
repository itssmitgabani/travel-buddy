
import { Calendar } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import SearchItem from '../../Components/SearchItemFight/SearchItem'
import './FlightSearch.scss'
import useFetch from '../../hooks/useFetch';
import Loader from '../../Components/Loader/Loader';

const FlightSearch = () => {
  const location = useLocation();
  const [from, setFrom] = useState(location.state.from);
  const [to, setTo] = useState(location.state.to);
  const [dates, setDates] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [sort, setSort] = useState(undefined);
  const { data, loading, error, reFetch } = useFetch(
    `/flight?from=${from}&to=${to}&date=${dates}&min=${min || 0 }&max=${max || 1000000}&sort=${sort || 1}`
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
              <label>From</label>
              <input placeholder={from} type="text" value={from}/>
            </div>
            <div className="lsItem">
              <label>To</label>
              <input placeholder={to} type="text" value={to}/>
            </div>
            <div className="lsItem">
              <label>Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates,
                "MM/dd/yyyy"
              )}`}</span>
              
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price
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
            <button >Search</button>
          </div>
          
          <div className="listResult">
          {
              data.length === 0 && <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',flexDirection:'column'}}>
                
                <h2>No Result Found!</h2>
                </div>
            }
          {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default FlightSearch
