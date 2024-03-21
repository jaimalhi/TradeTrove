import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/apiHelper";

function ViewTradies() {
   const [tradies, setTradies] = useState([]);

   useEffect(() => {
      const fetchTradies = async () => {
         try {
            const response = await axios.get(`${baseURL}/api/tradies/`, {
               withCredentials: true,
            });
            setTradies(response.data);
         } catch (error) {
            console.error("Error fetching tradies:", error);
         }
      };

      fetchTradies();
   }, []);

   console.log(tradies);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8 pt-[100px]">
         <h2 className="text-center text-dark-green mb-10 text-3xl font-bold">
            List of Contractors
         </h2>
         <div className="w-full max-w-2xl">
            {tradies.length > 0 ? (
               tradies.map((tradie) => (
                  <div key={tradie.uid} className="bg-white p-4 rounded-lg shadow-md mb-6">
                     <h3 className="text-xl font-semibold mb-2">
                        {tradie.first_name} {tradie.last_name}
                     </h3>
                     <p className="mb-1">
                        Email: <span className="font-medium">{tradie.email}</span>
                     </p>
                     <p className="mb-1">
                        Phone: <span className="font-medium">{tradie.phone_num}</span>
                     </p>
                     <p className="mb-1">
                        Experience:{" "}
                        <span className="font-medium">{tradie.years_experience} years</span>
                     </p>
                     <p>
                        Skills: <span className="font-medium">{tradie.skills.join(", ")}</span>
                     </p>
                  </div>
               ))
            ) : (
               <p className="text-lg">No tradies found.</p>
            )}
         </div>
      </div>
   );
}

export default ViewTradies;
