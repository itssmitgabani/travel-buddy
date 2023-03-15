import './PieCharts.scss'
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector,Cell,Legend} from "recharts";
import useFetch from '../../hooks/useFetch';

const data1 = [
  { name: "User", value: 500 },
  { name: "Hotel", value: 150 },
  { name: "Airline", value: 30 },
  { name: "Admin", value: 20 }
];

const COLORS = ['crimson', '#f09819', '#23a2f6', 'green'];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
    </g>
  );
};


const style = {
  top: '75%',
  left: '5%',
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};
const PieCharts = ({value}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  let hotel = 0
  let admin = 0
  let user = 0
  let airline = 0
  
  let data

  
  admin = useFetch('/admin/count/admin')
  user = useFetch('/users/count')
  hotel = useFetch('/hotels/count')
  airline = useFetch('/airlines/count')
  data = [
    {"name":"user","value":user.data},
    {"name":"hotel","value":hotel.data},
    {"name":"airline","value":airline.data},
    {"name":"admin","value":admin.data},
  ]

  return (
    <div className='pieCharts'>
      <h1>User Ratio</h1>
    <PieChart width={400} height={454.2}  className="pie">
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={200}
        cy={150}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        
        {data1.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          
      </Pie>
      <Legend wrapperStyle={style} />
    </PieChart>
    </div>
  )
}

export default PieCharts
