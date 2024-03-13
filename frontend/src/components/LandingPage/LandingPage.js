import React from 'react'
import "./LandingPage.css";
import landingPageImage from '../../Resources/Images/LandingImage.jpg';
import { Link, NavLink} from 'react-router-dom';
import "../../index.css";
function LandingPage() {
  return (
    <div className='landingPage'>
        <div className='landingPageContainer'>
            <img className='landingPage_image'
                src={landingPageImage} alt ="LandingPageImage"
            />
            <div className='introductonContainer'>
                <p className='introParagraph'>Welcome to TradeTrove, a revolutionary trade service platform where connecting with skilled professionals is effortless. Post your job requests, discover a wide range of services, and immerse yourself in a seamless marketplace experience.</p>

            </div>
        </div>
    </div>
  )
}

export default LandingPage