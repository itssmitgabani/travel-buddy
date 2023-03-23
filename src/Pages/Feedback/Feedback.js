import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import {feedbackColumns,feedbackRows} from '../../dataTableSrc.js'
import './Feedback.scss'
import Loader from '../../Components/Loader/Loader'
const Feedback = () => {
  
  const {data,loading} = useFetch('/feedback/airline')
  return (
    <div className="feedbackContainer">
    {loading && <Loader/>}
      <h1>Feedbacks:</h1>
      <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={feedbackColumns}
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

export default Feedback
