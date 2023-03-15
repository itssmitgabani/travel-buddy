import './Bookings.scss'
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'
import {bookingColumns,bookingRows} from '../../dataTableSrc.js'
import { useContext, useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';

const Bookings = () => {
  const ActionColumn = [
    {
        field: "action",
        headerName: "Action",
        width: 150,
        sortable: false,
        renderCell: (params) => {
            return (
                <div className='viewButton'><Link to={params.row._id} className='link'>View</Link></div>
            )
        }
    },
   
] 

const {user } = useContext(AuthContext);

const {data} = useFetch(`/airlines/getBookings/${user._id}`);
const [data1,setData1] = useState(data);
useEffect(() => { setData1(data)}, [data] )
const handleChange = (event) => {
  console.log(event.target.value);
  setData1( data.filter(item=>(item.username.includes(event.target.value) )))
};
  return (
    <div className="bookingsContainer">
      <h1>Bookings:</h1>
      <input type="text" placeholder='Search by Customer name'style={{ marginTop:'20px' ,width:'20%',height:'30px',borderRadius:'10px',padding:'5px 15px'}}
        onChange={handleChange}

      />
      <div style={{ height: 400, width: '100%',marginTop:'20px' }}>
                <DataGrid
                    rows={data1}
                    columns={bookingColumns.concat(ActionColumn)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    disableColumnMenu	
                    getRowId={row=>row._id}	
                />
            </div>
    </div>
  )
}

export default Bookings
