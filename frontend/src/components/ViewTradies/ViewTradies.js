import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/apiHelper";
import { MdAttachEmail, MdLocalPhone } from "react-icons/md";

function ViewTradies() {
  const [tradies, setTradies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTradies, setFilteredTradies] = useState([]);

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

  useEffect(() => {
    // Filter tradies based on search query
    const filtered = tradies.filter(tradie => {
      // Check if tradie's skills match search query
      const skillsMatch = tradie.skills.some(skill =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Check if tradie's years of experience match search query
      const experienceMatch = tradie.years_experience >= parseInt(searchQuery);
      return skillsMatch || experienceMatch;
    });
    setFilteredTradies(filtered);
  }, [searchQuery, tradies]);

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
      return "NN"; // Or any other placeholder you prefer
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8 pt-[100px]">
      <h2 className="text-center text-dark-green mb-10 text-5xl font-bold">
        List of Contractors
      </h2>
      <div className="w-full max-w-2xl mb-4">
        <input
          type="text"
          placeholder="Search by skills or years of experience"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2  border border-medium-green shadow-md rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="w-full max-w-2xl">
        {filteredTradies.length > 0 ? (
          filteredTradies.map((tradie) => (
            <div
              key={tradie.uid}
              className="bg-white p-4 rounded-lg border border-medium-green shadow-md mb-6 flex items-center"
            >
              <div className="flex-none mr-10 flex items-center justify-center h-24 w-24 rounded-full bg-light-green text-white text-4xl">
                {getInitials(tradie.first_name, tradie.last_name)}
              </div>
              <div className="flex-grow">
                <h3 className="text-4xl font-semibold mb-2">
                  {tradie.first_name} {tradie.last_name}
                </h3>
                <a
                  href={`mailto:${tradie.email}`}
                  className="font-medium text-2xl flex items-center text-blue-800"
                >
                  <MdAttachEmail className="mr-4 font-medium" />
                  {tradie.email}
                </a>
                <a
                  href={`tel:${tradie.phone_num}`}
                  className="font-medium text-2xl flex items-center  text-blue-800"
                >
                  <MdLocalPhone className="mr-4 font-medium" />
                  {tradie.phone_num}
                </a>
                <p className="mb-1 text-2xl">
                  Experience:{" "}
                  <span className="font-medium text-2xl">
                    {tradie.years_experience} years
                  </span>
                </p>
                <p className="mb-1 text-2xl">
                  Skills:{" "}
                  <span className="font-medium text-2xl">
                    {tradie.skills.join(", ")}
                  </span>
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
