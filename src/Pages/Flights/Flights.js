import React, { useContext } from 'react'
import FlightCard from '../../Components/flightCard/FlightCard'
import './Flights.scss'
import {Link} from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { flightsColumns, flightsRows } from '../../dataTableSrc'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'
import Loader from '../../Components/Loader/Loader'

const Rooms = () => {
  const ActionColumn = [
    {
        field: "action",
        headerName: "Action",
        width: 150,
        sortable: false,
        renderCell: (params) => {
            return (
                <div className='viewButton'><Link to={`view/${params.row._id}`} className='link'>View</Link></div>
            )
        }
    },]
    const {user} = useContext(AuthContext)
    const {data ,loading} = useFetch(`/flight/${user._id}`)
  return (
    <div className="roomContainer">
      {loading && <Loader/>}
      <h1>Flights:</h1>
      <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={flightsColumns.concat(ActionColumn)}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    disableColumnMenu	
                    getRowId={row=>row._id}	
                
                />
            </div>
            
      <Link to="add" className='link'><div className="addFlight">+</div></Link>
    </div>
  )
}

export default Rooms
