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

    const getInitials = (firstName, lastName) => {
      // Check if both names are provided and are not empty
      if (firstName && lastName) {
        return `${firstName[0]}${lastName[0]}`;
      }
      // If only firstName is provided and not empty
      else if (firstName) {
        return `${firstName[0]}`;
      }
      // If only lastName is provided and not empty
      else if (lastName) {
        return `${lastName[0]}`;
      }
      // If neither name is provided or both are empty, return a default placeholder
      else {
        return 'NN'; // Or any other placeholder you prefer
      }
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8 pt-[100px]">
            <h2 className="text-center text-dark-green mb-10 text-3xl font-bold">
                List of Contractors
            </h2>
            <div className="w-full max-w-2xl ">
                {tradies.length > 0 ? (
                    tradies.map((tradie) => (
                        <div key={tradie.uid} className="bg-white p-4 rounded-lg border border-medium-green shadow-md mb-6 flex items-center">
                            <div className="flex-none mr-10 flex items-center justify-center h-24 w-24 rounded-full bg-light-green text-white text-3xl">
                                {getInitials(tradie.first_name, tradie.last_name)}
                            </div>
                            <div className="flex-grow ">
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
                                    Experience: <span className="font-medium">{tradie.years_experience} years</span>
                                </p>
                                <p>
                                    Skills: <span className="font-medium">{tradie.skills.join(", ")}</span>
                                </p>
                            </div>
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
