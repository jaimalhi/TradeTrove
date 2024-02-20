// import './App.css';
import React from "react";
import Login from './components/LoginPage/LoginPage';
import SignUp from "./components/SignupPage";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Switch, Route,Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/SignUpPage" element={<SignUp />}></Route>
        <Route path='/LoginPage' element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
