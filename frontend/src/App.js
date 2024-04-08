// import './App.css';
import "./tailwind.css";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import Login from "./components/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ViewJobsPage from "./components/ViewJobsPage/ViewJobsPage";
import TradieServicesPage from "./components/TradieServicesPage/TradieServicesPage";
import ViewTradies from "./components/ViewTradies/ViewTradies";
import Cookies from "js-cookie";
import { useState } from "react";
import CustomerServices from "./components/CustomerServices/CustomerServices";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("loggedIn")); // Initial login state
  const [isTradie, setIsTradie] = useState(Cookies.get("isTradie")); // Initial login state

  const handleLoginCookie = () => {
    setIsLoggedIn("true");
  };

  const handleTradieCookie = (isTradie) => {
    setIsTradie(isTradie);
  };

  const handleLogoutClicked = async (e) => {
    if (e) {
      e.preventDefault();
    }
    Cookies.set("loggedIn", "false");
    Cookies.remove("uid");
    Cookies.remove("isTradie");
    setIsLoggedIn("false");
  };
  console.log("value of is logged in", isLoggedIn);
  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogoutClicked={handleLogoutClicked}
        isTradie={isTradie}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <Login
              handleLoginCookie={handleLoginCookie}
              handleTradieCookie={handleTradieCookie}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupPage
              handleLoginCookie={handleLoginCookie}
              handleTradieCookie={handleTradieCookie}
            />
          }
        />
        <Route path="/tradie/jobs" element={<ViewJobsPage />} />
        <Route path="/tradie/services" element={<TradieServicesPage />} />
        <Route path="/customer/services" element={<ViewTradies />} />
        <Route path="/customer/jobs" element={<CustomerServices />} />
      </Routes>
    </Router>
  );
}

export default App;
