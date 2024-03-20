import React from "react";
import "./LandingPage.css";
import landingPageImage from "../../Resources/Images/LandingImage.jpg";
import { Link } from "react-router-dom";
import "../../index.css";
import Cookies from "js-cookie";

function LandingPage() {
  const loggedCookie = Cookies.get("loggedIn");
  var isLoggedIn = loggedCookie; 
  if(loggedCookie == null){
   isLoggedIn = "false";
  }


  return (
    <div className="landingPage">
      <div className="landingPageContainer">
        <img
          className="landingPage_image"
          src={landingPageImage}
          alt="LandingPageImage"
        />
        <div className="introductonContainer">
          <p className="introParagraph">
            Welcome to TradeTrove, a revolutionary trade service platform where
            connecting with skilled professionals is effortless. Post your job
            requests, discover a wide range of services, and immerse yourself in
            a seamless marketplace experience.
          </p>
        </div>
        {
          isLoggedIn==="false" ? (
          <div className="absolute right-4 top-1/3 flex flex-row w-1/3 h-16 place-content-around justify-center">
          <div class="grow">
            <Link to="/login">
              <button
                type="button"
                className=" text-white w-3/4 h-3/4 text-[#000000] bg-[#D2E3C8] hover:bg-[#86A789] focus:ring-4 focus:outline-none focus:ring-[#739072] font-medium rounded-lg text-xl text-center dark:bg-[#739072] dark:hover:bg-[#4F6F52] dark:focus:ring-[#D2E3C8]"
              >
                Login
              </button>
            </Link>
          </div>
          <div className="grow">
            <Link to="/signup">
              <button
                type="button"
                className=" text-white w-3/4 h-3/4 text-[#000000] bg-[#D2E3C8] hover:bg-[#86A789] focus:ring-4 focus:outline-none focus:ring-[#739072] font-medium rounded-lg text-xl text-center dark:bg-[#739072] dark:hover:bg-[#4F6F52] dark:focus:ring-[#D2E3C8]"
              >
                Sign Up
              </button>
            </Link>
          </div>
      </div>) :(<></>)
        }
        </div>
    </div>
  );
}

export default LandingPage;
