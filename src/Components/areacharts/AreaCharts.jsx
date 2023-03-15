import './AreaCharts.scss'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, Legend } from 'recharts';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';

const data = [
    {
        name: 'Jan',
        Revenue: 4000,
        booking:4,
    },
    {
        name: 'Feb',
        Revenue: 10000,
        booking:3,
    },
    {
        name: 'Mar',
        Revenue: 2000,
        booking:2,
    },
    {
        name: 'Apr',
        Revenue: 2780,
        booking:4,
    },
    {
        name: 'May',
        Revenue: 1890,
        booking:4,
    },
    {
        name: 'Jun',
        Revenue: 2390,
        booking:1,
    },
    {
        name: 'Jul',
        Revenue: 3490,
        booking:4,
    },
    {
        name: 'Aug',
        Revenue: 3490,
        booking:0,
    },
    {
        name: 'Sep',
        Revenue: 2000,
        booking:4,
    },
    {
        name: 'Oct',
        Revenue: 4000,
        booking:3,
    },
    {
        name: 'Nov',
        Revenue: 3490,
        booking:4,
    },
    {
        name: 'Dec',
        Revenue: 5000,
        booking:4,
    },
];


const AreaCharts = () => {
    const monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const {user} = useContext(AuthContext)
const {data} = useFetch(`/bookAirline/chart/${user._id}`)
    data.map((item)=>(
        item.mon = monthNames[item._id.month]
    ))
    return (
        <div className='areaCharts'>
            <div>
                <h1>Income Chart</h1>
            </div>
            <div>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 0,
                    }}
                >
                    <Legend verticalAlign="top"/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mon" />
                    <YAxis yAxisId="left" tickFormatter={(value) => value && value.toLocaleString() + '₹'} dataKey="revenue" domain={[0, dataMax => (dataMax * 1.5)]}/>
                    <YAxis  yAxisId="right" orientation='right' dataKey="booking" domain={[0, dataMax => (dataMax * 2)]}/>
                    <Tooltip formatter={(value) => value && value.toLocaleString()}/>
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="green"   />
                    <Line yAxisId="right" type="monotone" dataKey="booking" stroke="orange"  />
                    
                </LineChart>
            </ResponsiveContainer>
            

            </div>
            
        </div>
    )
}

export default AreaCharts
