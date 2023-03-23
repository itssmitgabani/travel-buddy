import './All.scss'
import { DataGrid } from '@mui/x-data-grid';
import {  hotelColumns, airlineRows, airlineColumns, userColumns, userRows, hotelBookingColumns, hotelBookingRows, flightBookingColumns, flightBookingRows, couponColumns, couponRows, feedbackRows, feedbackColumns } from '../../dataTableSource'
import { Link, useLocation } from 'react-router-dom';
import useFetch from "../../hooks/useFetch.js"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader'


const All = ({ type }) => {

    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const handleActivate = async (id) =>{
        try{
            await axios.put(`/${path}/Activate/${id}`);
            window.location.reload(true);
            
        }catch(err){

        }
    }
    const handleDeActivate = async (id) =>{
        try{
            await axios.put(`/${path}/DeActivate/${id}`);
            url = "/hotel/Activated"
            window.location.reload(true);
        }catch(err){

        }
    }

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
    const ActivateColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='aButton' onClick={()=>handleActivate(params.row._id)}>Activate</div>
                )
            }
        },
    ]
    const DeactivateColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='dButton' onClick={()=>handleDeActivate(params.row._id)}>Deactivate</div>
                )
            }
        },
    ]
    let url = ""
    let r, c;
    switch (type) {
        case "hotel":
            url = "/hotels";
            c = hotelColumns.concat(ActionColumn);
            break

        case "hotelA":
            url = "/hotels/Activated"
            c = hotelColumns.concat(DeactivateColumn);
            break

        case "hotelD":
            url = "/hotels/DeActivated"
            c = hotelColumns.concat(ActivateColumn);
            break

        case "airline":
            url = "/airlines";
            c = airlineColumns.concat(ActionColumn);
            break

        case "airlineA":
            url = "/airlines/Activated"
            c = airlineColumns.concat(DeactivateColumn);
            break

        case "airlineD":
            url = "/airlines/DeActivated"
            c = airlineColumns.concat(ActivateColumn);
            break

        case "user":
            url = "/users";
            c = userColumns.concat(ActionColumn);
            break
        case "userA":
            url = "/users/Activated"
            c = userColumns.concat(DeactivateColumn);
            break
        case "userD":
            url = "/users/DeActivated"
            c = userColumns.concat(ActivateColumn);
            break
        case "hotelB":
            url = "/bookHotel"
            c = hotelBookingColumns;
            break
        case "flightB":
            url = "/bookAirline"
            c = flightBookingColumns;
            break

        case "coupon":
            url = "/coupon"
            c = couponColumns;
            break

        case "feedback":
            url = "/feedback/admin"
            c = feedbackColumns;
            break
        default:
    }
    
    const {data , loading,error} = useFetch(url)
    
    return (
        <div className='all'>
            {loading && <Loader/>}
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={c}
                    pageSize={[5]}
                    disableSelectionOnClick
                    disableColumnMenu	
                    getRowId={row=>row._id}
                />
            </div>
        </div>
    )
}

export default All
