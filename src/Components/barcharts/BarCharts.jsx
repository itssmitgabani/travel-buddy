import './BarCharts.scss'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    Admin: 1,
    User: 10,
    Hotel: 2,
    Airline: 3,
  },
  {
    name: 'Feb',
    Admin: 1,
    User: 1398,
    Hotel: 2210,
    Airline: 2500,
  },
  {
    name: 'Mar',
    Admin: 2000,
    User: 9800,
    Hotel: 2290,
    Airline: 2500,
  },
  {
    name: 'Apr',
    Admin: 2780,
    User: 3908,
    Hotel: 2000,
    Airline: 2500,
  },
  {
    name: 'May',
    Admin: 1890,
    User: 4800,
    Hotel: 2181,
    Airline: 2500,
  },
  {
    name: 'Jun',
    Admin: 4000,
    User: 2400,
    Hotel: 2400,
    Airline: 2500,
  },
  {
    name: 'Jul',
    Admin: 3000,
    User: 1398,
    Hotel: 2210,
    Airline: 2500,
  },
  {
    name: 'Aug',
    Admin: 2000,
    User: 9800,
    Hotel: 2290,
    Airline: 2500,
  },
  {
    name: 'Sep',
    Admin: 2780,
    User: 3908,
    Hotel: 2000,
    Airline: 2500,
  },
  {
    name: 'Oct',
    Admin: 1890,
    User: 4800,
    Hotel: 2181,
    Airline: 2500,
  },
  {
    name: 'Nov',
    Admin: 2390,
    User: 3800,
    Hotel: 2500,
    Airline: 2500,
  },
  {
    name: 'Dec',
    Admin: 3490,
    User: 4300,
    Hotel: 2100,
    Airline: 2500,
  },
];


const style = {
  padding: '5px',
  height: '40px',
  marginLeft: '10px',
  left:'5%',
};
const AreaChart = () => {
  return (
    <div className='barChart'>
      <h1>Users</h1>
      <p>User and client craeted</p>
      <ResponsiveContainer width="100%" aspect={2/1}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={style}/>
          <Bar dataKey="User" fill="crimson" />
          <Bar dataKey="Hotel" fill="#f09819" />
          <Bar dataKey="Airline" fill="#23a2f6" />
          <Bar dataKey="Admin" fill="green" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}

export default AreaChart
