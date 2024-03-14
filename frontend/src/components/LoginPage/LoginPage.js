import React from "react";
import axios from "axios";

import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8080";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const provider = new GoogleAuthProvider();
   const navigate = useNavigate();

   const onGoogleSignIn = async (e) => {
      e.preventDefault();
      await signInWithPopup(auth, provider)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // axios.get(`${baseURL}/auth/login`, {
            //   title: "Authenticated",
            //   body: { token: token, user: user },
            // });
            console.log(user, token);
            navigate("/");
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            // The AuthCredential type that was used.
            alert("Sorry, cannot log you in.");
            const credential = GoogleAuthProvider.credentialFromError(error);
         });
   };

   const onSignIn = async (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const token = user.uid;
            axios
               .post(`${baseURL}/api/auth/login`, {
                  title: "Authenticated",
                  data: { token: token },
               })
               .then((response) => {
                  console.log(response.data);
                  if (response.data === true) {
                     navigate("/tradieViewJobs");
                  } else {
                     console.log(response);
                     navigate("/");
                  }
               })
               .catch((error) => {
                  console.error("Error:", error);
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
      <div className="flex justify-center items-center h-screen bg-very-light-green">
         <div className="w-full max-w-xs">
            <h1 className="text-xl font-semibold text-dark-green mb-4 text-center">Login</h1>
            <p className="text-medium-green">Hey, enter your details to sign into your account.</p>
            <form className="mt-4">
               <div>
                  <input
                     className="appearance-none border-2 border-medium-green rounded w-full py-2 px-3 text-grey-darker mb-3"
                     type="text"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                     className="appearance-none border-2 border-medium-green rounded w-full py-2 px-3 text-grey-darker mb-3"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-sm text-light-green mb-4">Having trouble in sign in?</p>
               </div>
               <div className="flex flex-col items-center">
                  <button
                     type="submit"
                     className="bg-dark-green text-white font-bold py-2 px-4 rounded mb-2 w-full hover:bg-medium-green"
                     onClick={onSignIn}>
                     Sign in
                  </button>
                  <p className="text-medium-green mb-2">Or Sign in with</p>
                  <button
                     onClick={onGoogleSignIn}
                     className="bg-medium-green text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full hover:bg-light-green">
                     <FaGoogle className="mr-2" />
                     Google
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
