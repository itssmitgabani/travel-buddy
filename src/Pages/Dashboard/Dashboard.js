import AreaCharts from '../../Components/areacharts/AreaCharts'
import Widget from '../../Components/widget/Widget'
import './Dashboard.scss'

const Dashboard = () => {
  return (
    <>
        <div className="widgets">
        <div className='blank'></div>
          <Widget type="bookings"/>
          <Widget type="revenue"/>
          <Widget type="flights"/>
          <div className='blank'></div>
        </div>
        <div className="chartContainer">
          <AreaCharts/>
        </div>
        </>
  )
}

export default Dashboard
