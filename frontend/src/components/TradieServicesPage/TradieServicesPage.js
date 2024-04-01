import React, { useEffect, useState } from "react";
import LandingImage from "../../Resources/Images/LandingImage.jpg";
import { FaWrench, FaPlus } from "react-icons/fa";
import AddServicesBox from "./AddServiesBox";
import axios from "axios";
import { baseURL } from "../../utils/apiHelper";
import { MdAttachEmail } from "react-icons/md";

function TradieServicesPage() {
  const placeholderTradie = {
    first_name: "",
    last_name: "",
    email: "",
    passsword: "",
    skills: [],
    years_experience: "",
  };

  const [tradieInfo, setTradieInfo] = useState(placeholderTradie);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    try {
      const response = axios
        .get(`${baseURL}/api/tradies/getTradieInfo`, {
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
  return (
    <div>
      <div className="p-24 mx-auto mt-8 max-w-screen-lg">
        <div className="bg-white p-4 rounded-lg border border-medium-green shadow-md mb-6 flex items-center">
          <div className="flex-none mr-10 flex items-center justify-center h-24 w-24 rounded-full bg-light-green text-white text-4xl">
            {getInitials(tradieInfo.first_name, tradieInfo.last_name)}
          </div>
          <div className="flex flex-col justify-left ml-10 ">
            <p className="text-4xl  mb-4">
              {tradieInfo.first_name} {tradieInfo.last_name}
            </p>
            <a
              href={`mailto:${tradieInfo.email}`}
              className="text-2xl flex items-center mb-4 hover:text-blue-800"
            >
              <MdAttachEmail className="mr-4" />
              {tradieInfo.email}
            </a>
            <p className="text-2xl ">
              {tradieInfo.years_experience} years of experience
            </p>
          </div>
        </div>
        <h3 className="text-4xl text-center mt-12 mb-8">My Services</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tradieInfo.skills.map((service, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg border border-medium-green shadow-md mb-6 flex items-cente"
            >
              <FaWrench className="text-medium-green mr-4" size={30} />
              <span className="text-xl">{service}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-8">
          <button
            className="flex items-center px-4 py-2 bg-medium-green text-white rounded-full shadow-lg hover:bg-green-800"
            onClick={addServiceButtonClicked}
          >
            <FaPlus className="mr-2" /> Add Service
          </button>
        </div>
      </div>
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <AddServicesBox onCloseButtonClicked={onCloseButtonClicked} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TradieServicesPage;
