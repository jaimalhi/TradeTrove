import React from "react";
import axios from "axios";
import styles from "./LoginPage.module.css";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Link, NavLink, useNavigate } from "react-router-dom";

const baseURL = "https://localhost:3001";

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
            axios.put(`/login`,{
               title:"Authenticated",
               body: {token:token,user:user}
            })
            navigate("/landingTemp");
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

   const onSignIn = async(e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const token = user.uid;
            navigate("/landingTemp")
            console.log(user);
             axios.put(`/login`, {
               title: "Authenticated",
               body: {token:token,user:user},
             });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            alert("User does not exist")
        });
   }

   return (
      <div className={styles.mainContainer}>
         <div className={styles.titleContainer}>
            <h1>Login</h1>
            <p className={styles.titleText}>Hey, enter your details to sign into your account.</p>
         </div>
         <form className={styles.formContainer}>
            <div>
               <input
                  className={styles.inputContainer}
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}></input>
               <input
                  className={styles.inputContainer}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}></input>
               <p className={styles.troubleText}>Having trouble in sign in?</p>
            </div>
            <div className={styles.bottomContainer}>
               <button type="submit" className={styles.submitButton} onClick={onSignIn}>
                  Sign in
               </button>
               <p> Or Sign in with </p>
               <div className={styles.googleButtonContainer}>
                  <button onClick={onGoogleSignIn} className={styles.googleButton}>
                     <FaGoogle />
                     Google
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Login;
