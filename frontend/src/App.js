// import './App.css';
import "./tailwind.css";
import Navbar from "./components/Navbar/Navbar";
import React from "react";
import Login from "./components/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ViewJobsPage from "./components/ViewJobsPage/ViewJobsPage";
import TradieServicesPage from "./components/TradieServicesPage/TradieServicesPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={[<Navbar />, <TradieServicesPage />]}></Route>
        <Route path="/login" element={[<Navbar />, <Login />]}></Route>
        <Route path="/signUp" element={[<Navbar />, <SignupPage />]}></Route>
        <Route path="/tradieViewJobs" element={[<Navbar />, <ViewJobsPage />]}></Route>
      </Routes>
    </Router>
  );
}

export default App;
