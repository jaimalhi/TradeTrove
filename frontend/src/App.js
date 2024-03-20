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
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";

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
      e.preventDefault();
      Cookies.set("loggedIn", "false");
      Cookies.remove("uid");
      Cookies.remove("isTradie");
      setIsLoggedIn("false");
      console.log(isLoggedIn);
      window.location.href = "/";
   };

   return (
      <Router>
         <Routes>
            <Route
               path="/"
               element={[
                  <Navbar
                     isLoggedIn={isLoggedIn}
                     handleLogoutClicked={handleLogoutClicked}
                     isTradie={isTradie}
                  />,
                  <LandingPage />,
               ]}></Route>
            <Route
               path="/login"
               element={[
                  <Navbar
                     isLoggedIn={isLoggedIn}
                     handleLogoutClicked={handleLogoutClicked}
                     isTradie={isTradie}
                  />,
                  <Login
                     handleLoginCookie={handleLoginCookie}
                     handleTradieCookie={handleTradieCookie}
                  />,
               ]}></Route>
            <Route
               path="/signup"
               element={[
                  <Navbar
                     isLoggedIn={isLoggedIn}
                     handleLogoutClicked={handleLogoutClicked}
                     isTradie={isTradie}
                  />,
                  <SignupPage
                     handleLoginCookie={handleLoginCookie}
                     handleTradieCookie={handleTradieCookie}
                  />,
               ]}></Route>
            <Route
               path="/tradie/jobs"
               element={[
                  <Navbar
                     isLoggedIn={isLoggedIn}
                     handleLogoutClicked={handleLogoutClicked}
                     isTradie={isTradie}
                  />,
                  <ViewJobsPage />,
               ]}></Route>
            <Route
               path="/tradie/services"
               element={[
                  <Navbar
                     isLoggedIn={isLoggedIn}
                     handleLogoutClicked={handleLogoutClicked}
                     isTradie={isTradie}
                  />,
                  <TradieServicesPage />,
               ]}></Route>
            <Route path="/customer/services" element={[ <Navbar
                     isLoggedIn={isLoggedIn}
                     handleLogoutClicked={handleLogoutClicked}
                     isTradie={isTradie}
                  />,<ViewTradies />]}></Route>
            <Route path="/customer/jobs" element={[ <Navbar
                     isLoggedIn={isLoggedIn}
                     handleLogoutClicked={handleLogoutClicked}
                     isTradie={isTradie}
                  />,<CustomerServices />]}></Route>
         </Routes>
      </Router>
   );
}

export default App;
