import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const GuardedRoute = ({ isLoggedIn }) => {
    console.log("here",isLoggedIn)
  return (isLoggedIn === "true" ? <Navigate to="/" />: <Outlet/>);
};

export default GuardedRoute;
