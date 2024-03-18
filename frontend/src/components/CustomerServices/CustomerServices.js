import React, { useEffect, useState } from "react";
import LandingImage from "../../Resources/Images/LandingImage.jpg";
import { FaWrench, FaPlus } from "react-icons/fa";
import AddJobsBox from "./AddJobsBox";
import axios from "axios";

const baseURL = "http://localhost:8080";

function CustomerServices() {
   const placeholderTradie = {
      first_name: "James",
      last_name: "John",
      email: "example@demo.com",
      passsword: "",
      skills: ["plumbing", "cleaning", "mounting tv", "fixing shower"],
      years_experience: "0",
   };

   const [tradieInfo, setTradieInfo] = useState(placeholderTradie);
   const [showOverlay, setShowOverlay] = useState(false);

   useEffect(() => {
      try {
         const response = axios
            .get(`${baseURL}/api/tradies/jobs`, {
               withCredentials: true,
            })
            .then((response) => {
               setTradieInfo(response.data);
            });
      } catch (error) {
         console.log("Error!");
      }
   }, [showOverlay]);

   const addServiceButtonClicked = async () => {
      setShowOverlay(true);
   };

   const onCloseButtonClicked = async () => {
      setShowOverlay(false);
   };

   return (
      <div>
         <div className="p-24 mx-auto mt-8 max-w-screen-lg">
            <div className="p-5 bg-white rounded-xl shadow-md flex flex-row items-center">
               <img src={LandingImage} className="w-60 h-60 rounded-full ml-14" alt="job-image" />
               <div className="flex flex-col justify-between ml-10">
                  <p className="text-3xl text-center">
                     {tradieInfo.first_name} {tradieInfo.last_name}
                  </p>
                  <p className="text-3xl text-center">
                     {tradieInfo.years_experience} years of experience
                  </p>
                  <p className="text-3xl text-center">{tradieInfo.email}</p>
               </div>
            </div>
            <h3 className="text-4xl text-center mt-12 mb-8">My Services</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {tradieInfo.skills.map((service, index) => (
                  <li key={index} className="bg-white shadow-md rounded-lg flex items-center p-4">
                     <FaWrench className="text-green-600 mr-4" size={30} />
                     <span className="text-xl">{service}</span>
                  </li>
               ))}
            </ul>
            <div className="flex justify-center mt-8">
               <button
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-800"
                  onClick={addServiceButtonClicked}>
                  <FaPlus className="mr-2" /> Add Service
               </button>
            </div>
         </div>
         {showOverlay && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
               <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                  <AddJobsBox onCloseButtonClicked={onCloseButtonClicked} />
               </div>
            </div>
         )}
      </div>
   );
}

export default CustomerServices;
