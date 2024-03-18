// import './App.css';
import "./tailwind.css";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import Login from "./components/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import SignupPage from "./components/SignupPage/SignupPage";

import ViewJobsPage from "./components/ViewJobsPage/ViewJobsPage";
import TradieServicesPage from "./components/TradieServicesPage/TradieServicesPage";

import CustomerServices from "./components/CustomerServices/CustomerServices";

import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={[<Navbar />, <LandingPage />]}></Route>
            <Route path="/login" element={[<Navbar />, <Login />]}></Route>
            <Route path="/signUp" element={[<Navbar />, <SignupPage />]}></Route>
            <Route path="/tradie/jobs" element={[<Navbar />, <ViewJobsPage />]}></Route>
            <Route path="/tradie/services" element={[<Navbar />, <TradieServicesPage />]}></Route>
            <Route path="/customer/services" element={[<Navbar />, <CustomerServices />]}></Route>
         </Routes>
      </Router>
   );
}

export default App;
