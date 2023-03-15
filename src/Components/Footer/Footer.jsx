import './Footer.scss'

const Footer = () => {
  return (
    <footer>
            <div className="row">
                <div className="col span_1_of_2">
                    <ul className="footer-nav">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Book hotel</a></li>
                        <li><a href="#">Book flight</a></li>
                    </ul>
                </div>
                <div className="col span_1_of_2">
                    <ul className="social-links">
                        <li><ion-icon class="facebook" name="logo-facebook"></ion-icon></li>
                        <li><ion-icon class="twitter" name="logo-twitter"></ion-icon></li>
                        <li><ion-icon class="google" name="logo-google"></ion-icon></li>
                        <li><ion-icon class="instagram" name="logo-instagram"></ion-icon></li>
                    </ul>
                </div>
            </div>
            <div className="copy">
                <p>Copyright 2023 by Travel-Buddy. All rights reserved.</p>
            </div>
        </footer>
  )
}

export default Footer
