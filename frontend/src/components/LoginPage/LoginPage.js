import React from "react";
import axios from "axios";

import { useState } from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/apiHelper";

const Login = ({ handleLoginCookie, handleTradieCookie }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

   const onSignIn = async (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const token = user.uid;
            axios
               .post(
                  `${baseURL}/api/auth/login`,
                  {
                     title: "Authenticated",
                     data: { token: token },
                  },
                  {
                     withCredentials: true,
                     headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                     },
                  }
               )
               .then((response) => {
                  console.log(response.data);
                  if (response.data === true) {
                     handleLoginCookie();
                     handleTradieCookie("true");
                     navigate("/tradie/jobs");
                  } else {
                     console.log(response);
                     handleLoginCookie();
                     handleTradieCookie("false");
                     navigate("/");
                  }
               })
               .catch((error) => {
                  console.error("Error:", error);
                  alert("Sorry error occurred!");
               });
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert("User does not exist");
         });
   };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full max-w-md shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-semibold text-dark-green mb-6 text-center">
          Login
        </h1>
        <p className="text-lg text-medium-green mb-6 text-center">
          Hey, enter your details to sign into your account.
        </p>
        <form className="mt-6">
          <div>
            <input
              className="appearance-none border-2 border-medium-green rounded-lg w-full py-3 px-4 text-lg text-grey-darker mb-4"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="appearance-none border-2 border-medium-green rounded-lg w-full py-3 px-4 text-lg text-grey-darker mb-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-base text-light-green mb-6 text-center">
              Having trouble signing in?
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-dark-green text-white font-bold py-3 px-6 rounded-lg mb-4 w-full hover:bg-medium-green text-lg"
              onClick={onSignIn}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default Login;
