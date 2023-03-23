import './Bookings.scss'
import { DataGrid } from '@mui/x-data-grid';
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext.js'
import {format} from 'date-fns'
import { Link } from 'react-router-dom';
import useFetch1 from '../../hooks/useFetch1';
import Loader from '../../Components/Loader/Loader';

const Bookings = () => {
  const hotelBookingColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "hotel",
      headerName: "Hotel",
      width: 270,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.hotelname}
          </div>
        );
      },
    },
    {
      field: 'totalAmt',
      headerName: 'Total Amount',
      width: 150,
    },
  {
      field: 'discountAmt',
      headerName: 'Discount Amount',
      width: 150,
    },
    { field: "rooms", headerName: "Total Rooms", width: 120 },
    { field: "adult", headerName: "Total Adult", width: 120 },
    { field: "children", headerName: "Total Children", width: 120 },
    
    
    {
      field: "bookingdate",
      headerName: "From",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.bookingdate.split("T")[0] }
          </div>
        );
      },
    },
    {
      field: "todate",
      headerName: "To",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.todate.split("T")[0] }
          </div>
        );
      },
    },
  ];
  const flightBookingColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "airline",
      headerName: "Airline",
      width: 270,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.airlinename}
          </div>
        );
      },
    },
    {
      field: 'totalAmt',
      headerName: 'Total Amount',
      width: 150,
    },
  {
      field: 'discountAmt',
      headerName: 'Discount Amount',
      width: 150,
    },
    { field: "seats", headerName: "Total Rooms", width: 120 },
    
    
    {
      field: "sourcecity",
      headerName: "From",
      width: 120,
      
    },
    {
      field: "destinationcity",
      headerName: "To",
      width: 120,
      
    },
  ];

  const ActionColumn = [
    {
        field: "action",
        headerName: "Action",
        width: 150,
        sortable: false,
        renderCell: (params) => {
            return (
                <div className='viewButton'><Link to={`hotel/${params.row._id}`} className='link'>View</Link></div>
            )
        }
    },
]
  const ActionColumn1 = [
    {
        field: "action",
        headerName: "Action",
        width: 150,
        sortable: false,
        renderCell: (params) => {
            return (
                <div className='viewButton'><Link to={`flight/${params.row._id}`} className='link'>View</Link></div>
            )
        }
    },
]
  
  const {user} = useContext(AuthContext)

  const {data , loading} = useFetch(`/bookHotel/f/${user._id}`)
  const {data1 , loading1} = useFetch1(`/bookAirline/${user._id}`)
  

  return (
    <div className="bookingContainer">
      {(loading || loading1) && <Loader/>}
      <div className="top">
          <h1 style={{color:'gray'}} >Hotel Bookings :</h1>

          <div style={{ height: 400, width: '100%' ,margin:'20px 0' }}>
                <DataGrid
                    rows={data}
                    columns={hotelBookingColumns.concat(ActionColumn)}
                    disableRowSelectionOnClick
                    autoPageSize
                    disableColumnMenu	
                    getRowId={row=>row._id}
                />
            </div>
      </div>
      <div className="bottom">
      <h1 style={{color:'gray'}}>Flight Bookings :</h1>

      <div style={{ height: 400, width: '100%' ,margin:'20px 0' }}>
                <DataGrid
                    rows={data1}
                    columns={flightBookingColumns.concat(ActionColumn1)}
                    disableRowSelectionOnClick
                    autoPageSize
                    disableColumnMenu	
                    getRowId={row=>row._id}
                />
            </div>
      </div>
    </div>
  )
}

export default Bookings
