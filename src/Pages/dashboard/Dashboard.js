import axios from 'axios'
import { useState } from 'react'
import AreaCharts from '../../Components/areacharts/AreaCharts'
import BarCharts from '../../Components/barcharts/BarCharts'
import PieCharts from '../../Components/piecharts/PieCharts'
import SimpleWidget from '../../Components/simplewidget/SimpleWidget'
import Widget from '../../Components/widget/Widget'
import './dashboard.scss'

const Dashboard = () => {

  return (
    < >
        <div className="widgets" >
          
        <div className='blank'></div>
          <Widget type="user" />
          <Widget type="hotelManagers"/>
          <Widget type="airlineManagers"/>
          <div className='blank'></div>
        </div>
        <div className="widgets">
          <div className='blank1'></div>
          <Widget type="hotelBookings"/>
          <Widget type="flightBookings"/>
          <div className='blank1'></div>
        </div>
        <div className="chartContainer">
          <PieCharts/>
          <AreaCharts type="Hotel" />
        </div>
        <div className="chartContainer">
          <AreaCharts type="Airline"/>
          <SimpleWidget/>
        </div>
        </>
  )
}

export default Dashboard
