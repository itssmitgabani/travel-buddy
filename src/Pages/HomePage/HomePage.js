import './HomePage.scss'
import logo from '../../Images/logo.png'
import  {Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'

const HomePage = () => {

    const {data} = useFetch('feedback')
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
                    <ion-icon class="icon-big" name="infinite-outline"></ion-icon>
                    <h3 className='title'>Up to 365 days/year</h3>
                    <p className='content'>Never cook again! We really mean that. Our subscription plans include up to 365 days/year coverage. You can also choose to order more flexibly if that's your style.</p>
                </div>
                <div className="box">
                    <ion-icon class="icon-big" name="alarm-outline"></ion-icon>
                    <h3 className='title'>Ready in 20 minutes</h3>
                    <p className='content'>You're only twenty minutes away from your delicious and super healthy meals delivered right to your home. We work with the best chefs in each town to ensure that you're 100% happy.</p>
                </div>
                <div className="box">
                    <ion-icon class="icon-big" name="fast-food-outline"></ion-icon>
                    <h3 className='title'>100% organic</h3>
                    <p className='content'>All our vegetables are fresh, organic and local. Animals are raised without added hormones or antibiotics. Good for your health, the environment, and it also tastes better!</p>
                </div>
                <div className="box">
                    <ion-icon class="icon-big" name="cart-outline"></ion-icon>
                    <h3 className='title'>Order anything</h3>
                    <p className='content'>We don't limit your creativity, which means you can order whatever you feel like. You can also choose from our menu containing over 100 delicious meals. It's up to you!</p>
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
                        <p>Choose plan that fits best for your need and sign-up today</p>
                    </div>
                    <div className="works-steps">
                        <div className='count'>2</div>
                        <p>Pay for the plan and downlaod the app</p>
                    </div>
                    <div className="works-steps">
                        <div className='count'>3</div>
                        <p>You are done start ordering!</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="section-testimonials " data-aos="fadeIn" data-aos-duration="2000">
            
                <h2 className='heading'>Our customers can't live witout us</h2>
            
            
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
