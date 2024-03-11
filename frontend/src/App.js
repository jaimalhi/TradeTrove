// import './App.css';
import "./tailwind.css";
import Navbar from "./components/Navbar/Narbar";
import React from "react";
import Login from "./components/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import SignupPage from "./components/SignupPage";
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={[<Navbar />, <LandingPage/>]}></Route>
            <Route path="/login" element={[<Navbar />, <Login/>]}></Route>
            <Route path="/signUp" element={[<Navbar />, <SignupPage/>]}></Route>
         </Routes>
      </Router>
   );
}

export default App;
