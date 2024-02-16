// import './App.css';
import React from "react";
import Login from './components/LoginPage/LoginPage';
import LandingTemp from "./components/LandingTemp";
import { BrowserRouter as Router, Switch, Route,Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/landingTemp" element={<LandingTemp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
