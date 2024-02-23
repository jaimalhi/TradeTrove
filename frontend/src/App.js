// import './App.css';
import "./tailwind.css";

import React from "react";
import Login from "./components/LoginPage/LoginPage";
import LandingTemp from "./components/LandingTemp";
import { BrowserRouter as Router, Switch, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Narbar";

function App() {
   return (
      <>
         <Navbar />
         <Router>
            <Routes>
               <Route path="/" element={<LandingTemp />}></Route>
               <Route path="/login" element={<Login />}></Route>
            </Routes>
         </Router>
      </>
   );
}

export default App;
