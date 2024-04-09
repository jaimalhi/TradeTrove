import React, { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../LoginPage/firebase";
import "./SignupPage.css";
import { useNavigate } from "react-router";
import { baseURL } from "../../utils/apiHelper";

function SignupPage({ handleLoginCookie, handleTradieCookie }) {
   var uid = "";
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      isTradesperson: false,
      yearsOfExperience: "",
      skills: "",
   });

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: type === "checkbox" ? checked : value,
      }));
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            if (formData.isTradesperson === "true") {
               axios
                  .post(
                     `${baseURL}/api/tradies/signup`,
                     {
                        title: "Authenticated",
                        data: { user: user, form: formData },
                     },
                     {
                        withCredentials: true,
                        headers: {
                           "Access-Control-Allow-Origin": "*",
                           "Content-Type": "application/json",
                        },
                     }
                  )
                  .then((uidResponse) => {
                     if (uidResponse) {
                        console.log("Successfully signed up the tradie!");
                        uid = uidResponse;
                        handleLoginCookie();
                        handleTradieCookie("true");
                        navigate("/tradie/jobs");
                     }
                  })
                  .catch((error) => {
                     alert(`Something went wrong! ${error}`);
                  });
            } else {
               const uidResponse = axios
                  .post(
                     `${baseURL}/api/customers/signup`,
                     {
                        title: "Authenticated",
                        data: { user: user, form: formData },
                     },
                     {
                        withCredentials: true,
                        headers: {
                           "Access-Control-Allow-Origin": "*",
                           "Content-Type": "application/json",
                        },
                     }
                  )
                  .then((uidResponse) => {
                     if (uidResponse) {
                        console.log("Successfully signed up!");
                        uid = uidResponse;
                        handleLoginCookie();
                        handleTradieCookie("false");
                        navigate("/";
                     }
                  })
                  .catch((error) => {
                     alert(`Something went wrong! ${error}`);

                     console.log(`Cant sign up ${error}`);
                  });
            }
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(`Something went wrong ${errorMessage}!`);
         });
   };

   return (
      <div className="flex justify-center items-center h-screen bg-white">
         <form onSubmit={handleSubmit} className="w-full max-w-xs">
            <h2 className="text-3xl text-center text-dark-green mb-6">Sign Up</h2>
            <p className="text-medium-green mb-4">Please fill in this form to create an account!</p>
            <input
               type="text"
               id="firstName"
               name="firstName"
               placeholder="First Name"
               value={formData.firstName}
               onChange={handleChange}
               required
               className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green "
            />

            <input
               type="text"
               id="lastName"
               name="lastName"
               placeholder="Last Name"
               value={formData.lastName}
               onChange={handleChange}
               required
               className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green "
            />

            <input
               type="email"
               id="email"
               name="email"
               placeholder="Email"
               value={formData.email}
               onChange={handleChange}
               required
               className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green"
            />

            <input
               type="password"
               id="password"
               name="password"
               placeholder="Password"
               value={formData.password}
               onChange={handleChange}
               required
               className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green"
            />

            <input
               type="password"
               id="confirmPassword"
               name="confirmPassword"
               placeholder="Confirm Password"
               value={formData.confirmPassword}
               onChange={handleChange}
               required
               className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green"
            />
            <input
               type="text"
               id="phoneNumber"
               name="phoneNumber"
               placeholder="Phone Number"
               value={formData.phoneNumber}
               onChange={handleChange}
               required
               className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green "
            />
            <div className="flex justify-around mb-4">
               <span className="mb-2 block text-lg">Are you a Trades Person?</span>
               <label className="inline-flex items-center">
                  <input
                     type="radio"
                     name="isTradesperson"
                     checked={formData.isTradesperson === "true"}
                     value={true}
                     onChange={handleChange}
                     className="form-radio"
                  />
                  <span className="ml-2">Yes</span>
               </label>
               <label className="inline-flex items-center">
                  <input
                     type="radio"
                     name="isTradesperson"
                     checked={formData.isTradesperson === "false"}
                     value={false}
                     onChange={handleChange}
                     className="form-radio"
                  />
                  <span className="ml-2">No</span>
               </label>
            </div>
            {formData.isTradesperson === "true" && (
               <div>
                  <input
                     type="text"
                     id="yearsOfExperience"
                     name="yearsOfExperience"
                     placeholder="Years of Experience"
                     value={formData.yearsOfExperience}
                     onChange={handleChange}
                     required
                     className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green "
                  />

                  <textarea
                     id="skills"
                     name="skills"
                     placeholder="Skills"
                     value={formData.skills}
                     onChange={handleChange}
                     required
                     className="mb-4 px-3 py-2 rounded shadow w-full border-2 border-medium-green "
                     style={{ height: "100px" }} // Adjust height as needed
                  />
               </div>
            )}

            <button
               type="submit"
               className="w-full bg-dark-green text-white py-2 rounded hover:bg-medium-green">
               Sign Up
            </button>
         </form>
      </div>
   );
}

export default SignupPage;
