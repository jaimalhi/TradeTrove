import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const GuardedRoute = ({ isLoggedIn, protectSignIn, isTradie, accessingTradiePage }) => {
  console.log(isTradie)
  return protectSignIn ? (
    isLoggedIn === "true" ? (
      <Navigate to="/" />
    ) : (
      <Outlet />
    )
  ) : isLoggedIn === "false" ||
    (accessingTradiePage == true && isTradie === "false") ||
    (accessingTradiePage == false && isTradie === "true") ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
  
};

export default GuardedRoute;
