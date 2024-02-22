// import './App.css';
import React from "react";
import Login from "./components/LoginPage/LoginPage";
import LandingPage from "./components/LandingPage/LandingPage";
import SignupPage from "./components/SignupPage/SignupPage";
import LandingTemp from "./components/LandingTemp"
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";

function App() {
   return (
     <Router>
       <Routes>
         <Route path="/" element={<LandingPage />}></Route>
         <Route path="/LoginPage" element={<Login />}></Route>
         <Route path="/SignUpPage" element={<SignupPage />}></Route>
         <Route path="/landingTemp" element={<LandingTemp />}></Route>
       </Routes>
     </Router>
   );
}

export default App;
