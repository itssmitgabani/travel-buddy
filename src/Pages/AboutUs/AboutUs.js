import Counter from '../../Components/Counter/Counter'
import './AboutUs.scss'

const AboutUs = () => {
  return (
    <div className="AboutUsContainer">
      <h2 className='heading'>About Us</h2>
      <span className="heading2">Let us tell you where we started and where we are...</span>
      <div className="mission">
        <h1 className='heading3'>Our <br/>Mission</h1>
        <p className='content'>OYO is a global platform that empowers entrepreneurs and small businesses with hotels and homes by providing full stack technology that increases earnings and eases operations. Bringing affordable and trusted accommodation that guests can book instantly.</p>
        <p className='content'>We strive to make the lives of our patrons easier by multiplying revenue channels and using our technological expertise to maximize demand.</p>
      </div>
      <div className="story">
        <h1 className='heading3'>Our <br/>Story</h1>
        <p className='content'>OYO is a global platform that empowers entrepreneurs and small businesses with hotels and homes by providing full stack technology that increases earnings and eases operations. Bringing affordable and trusted accommodation that guests can book instantly.</p>
        <p className='content'>We strive to make the lives of our patrons easier by multiplying revenue channels and using our technological expertise to maximize demand.</p>
      </div>
      <div className="counterContainer">
        <h1 className='title2'>India's No.1 E-Ticket Booking Plateform</h1>
        <div className="counter">
        <Counter type="hb"/>
          <Counter type="fb"/>
          
          <Counter type="u"/>
          <Counter type="hm"/>
          <Counter type="am"/>
        </div>
         </div>
    </div>
  )
}

export default AboutUs
