import Widget from '../widget/Widget'
import './SimpleWidget.scss'

const SimpleWidget = () => {
  return (
    <div className='simpleWidget'>
      <h1>Stats Report</h1>
      <div className='item'>
      <Widget type="revenue"/>
      <Widget type="income"/>
      </div>
      
    </div>
     
      
  )
}

export default SimpleWidget
