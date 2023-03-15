import './AreaCharts.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const data = [
    {
        name: 'Jan',
        Revenue: 4000,
    },
    {
        name: 'Feb',
        Revenue: 10000,
    },
    {
        name: 'Mar',
        Revenue: 2000,
    },
    {
        name: 'Apr',
        Revenue: 2780,
    },
    {
        name: 'May',
        Revenue: 1890,
    },
    {
        name: 'Jun',
        Revenue: 2390,
    },
    {
        name: 'Jul',
        Revenue: 3490,
    },
    {
        name: 'Aug',
        Revenue: 3490,
    },
    {
        name: 'Sep',
        Revenue: 2000,
    },
    {
        name: 'Oct',
        Revenue: 4000,
    },
    {
        name: 'Nov',
        Revenue: 3490,
    },
    {
        name: 'Dec',
        Revenue: 5000,
    },
];


const AreaCharts = ({type }) => {
    
    const monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let url
switch (type) {
    case "Hotel":
        url = "/bookHotel/total";
        break

    case "Airline":
        url = "/bookAirline/total"
        break
    default:
}
    const {data} = useFetch(url)
    data.map((item)=>(
        item.mon = monthNames[item._id.month]
    ))
    
    console.log(data)
    return (
        
        <div className='areaCharts'>
            
            <div>
                <h1>{type} Revenue(₹)</h1>
            </div>
            <div>
            <ResponsiveContainer width="100%" aspect={2}>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mon" />
                    <YAxis dataKey="total" tickFormatter={(total) => total && total.toLocaleString() + '₹'}/>
                    <Tooltip formatter={(total) => total && total.toLocaleString() + '₹'}/>
                    <Area type="monotone" dataKey="total" stroke={type==="Airline"? "#23a2f6":"#f09819"} fill={type==="Airline"? "rgba(35,162,246,0.7)":"rgba(240,152,25,0.7)"} />
                </AreaChart>
                
            </ResponsiveContainer>
            

            </div>
            
        </div>
    )
}

export default AreaCharts
