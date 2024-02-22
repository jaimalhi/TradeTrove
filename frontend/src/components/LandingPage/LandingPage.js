import React from 'react'
import "./LandingPage.css";
import landingPageImage from "../../Resources/Images/LandingImage.jpg";
import { Link, NavLink} from 'react-router-dom';
function LandingPage() {
  return (
    <div className='landingPage'>
        <div className='landingPageContainer'>
            <img className='landingPage_image'
                src={landingPageImage} alt ="LandingPageImage"
            />
            <div className='introductonContainer'>
                <p className='introParagraph'>Welcome to TradeTrove, a revolutionary trade service platform where connecting with skilled professionals is effortless. Post your job requests, discover a wide range of services, and immerse yourself in a seamless marketplace experience.</p>

            <div className='button_container'>
                <div className='button_wrapper'>
                <span className='small-text'>Already have an account?</span>
                <NavLink to ='/LoginPage'>
                <button className='login_button'>Login</button>
                </NavLink>
                </div>
                <div className='button_wrapper'>
                <span className='small-text'>Create account</span>
                <NavLink to ='/SignUpPage'>
                <button className='signup_button'>SignUp</button>
                </NavLink>
                </div>

            </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage