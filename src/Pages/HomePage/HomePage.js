import './HomePage.scss'
import logo from '../../Images/logo.png'
import  {Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

const HomePage = () => {

    const {data} = useFetch('/feedback/admin')
    const da = data.length
  return (
    <div className='HomePageContainer'>
      <header>
      <div className="hero-text-box">
                <h1 className='hero-text'>My new routine : <br/>Journey, Explore, Discover, Repeat. . .</h1>
                <Link to="/hotel"><div className="btn btn-full" href="#plans">Book Hotel</div></Link>
                <Link to="/flight"><div className="btn btn-ghost" href="#features">Book Flight</div></Link>
            </div>
      </header>
      <section className="section-features" id="features" data-aos="fadeIn" data-aos-duration="2000">
            
                <h2 className='heading'>Get fast booking</h2>
                <p className="long-copy">
                    Hello, we’re Travel-Buddy, your new premium booking service. We know you’re always busy. No time for visit hotel or airline to book tickets. So let us take care of that, we’re really good at it, we promise!
                </p>
            
            
                <div className="box">
                <ion-icon name="hourglass-outline" class="icon-big"></ion-icon>
                    <h3 className='title'>EASY BOOKING</h3>
                    <p className='content'>Book any hotel and flight by just click of your hand.</p>
                </div>
                <div className="box">
                    <ion-icon class="icon-big" name="alarm-outline"></ion-icon>
                    <h3 className='title'>24/7 Support</h3>
                    <p className='content'> we provide you best customer services in anytime you want.</p>
                </div>
                <div className="box">
                <ion-icon name="shield-checkmark-outline" class="icon-big"></ion-icon>
                    <h3 className='title'>100% safe</h3>
                    <p className='content'>we ensure you  100 precent sefty on booking of hotels and flights through our website.</p>
                </div>
                <div className="box">
                <ion-icon name="card-outline" class="icon-big"></ion-icon>
                    <h3 className='title'>Coupon</h3>
                    <p className='content'>Get existing discount using coupons.</p>
                </div>
            
        </section>

        <section className="section-steps" id="hiw" data-aos="fadeIn" data-aos-duration="2000">
           
                <h2 className='heading'>How it works &mdash; Simple as 1,2,3</h2>
            <div className="step">
                <div className="steps-box" data-aos="slide-left" data-aos-duration="2000">
                    <img src={logo} alt="phone" className="app-screen"/>
                </div>
                <div className="steps-box">
                    <div className="works-steps">
                        <div className='count'>1</div>
                        <p>Find Hotel or Flight and sign-up or sign-in today.</p>
                    </div>
                    <div className="works-steps">
                        <div className='count'>2</div>
                        <p>Book Flight or Hotel and Pay the bill Amount.</p>
                    </div>
                    <div className="works-steps">
                        <div className='count'>3</div>
                        <p>You are done start travelling!</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="section-testimonials " data-aos="fadeIn" data-aos-duration="2000">
            
                <h2 className='heading'>Our customers can't live without us</h2>
            
            
                <div className="">
                    <blockquote>
{da && data[0].feedback}
                        <cite><img src={da && data[0].img} alt="cust-1"/>{da &&data[0].username}</cite>
                    </blockquote>
               
                <div className="">
                    <blockquote>
                    {da &&data[1].feedback}
                        <cite><img src={da &&data[1].img} alt="cust-2"/>{da &&data[1].username}</cite>
                    </blockquote>
                </div>
                <div className="">
                    <blockquote>
                    {da &&data[2].feedback}
                        <cite><img src={da &&data[2].img}alt="cust-3"/>{da &&data[2].username}</cite>
                    </blockquote>
                </div>
            </div>
        </section>
        
        
        
        
    </div>
  )
}

export default HomePage
