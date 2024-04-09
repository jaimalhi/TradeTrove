import React, { useEffect, useState } from "react";
import LandingImage from "../../Resources/Images/LandingImage.jpg";
import { FaWrench, FaPlus } from "react-icons/fa";
import AddJobsBox from "./AddJobsBox";
import ImageViewer from "../../utils/ImageViewer";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../../utils/apiHelper";
import { MdAttachEmail, MdLocalPhone } from "react-icons/md";

const placeholderCustomer = {
  first_name: "Loading User...",
  last_name: "",
  email: "please wait...",
  tradie: false,
  phone_num: "1234567890",
};

function CustomerServices() {
  const [customerInfo, setCustomerInfo] = useState(placeholderCustomer);
  const [showOverlay, setShowOverlay] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [imageSrc, setImageSrc] = useState("");

  // get uid from cookies
  const uidCookie = Cookies.get("uid");

  useEffect(() => {
    Promise.all([
      axios.get(`${baseURL}/api/users/${uidCookie}`),
      axios.get(`${baseURL}/api/users/${uidCookie}/jobs`),
    ])
      .then(([response1, response2]) => {
        console.log(response1);
        setCustomerInfo(response1.data);
        console.log(response2.data);
        setJobs(response2.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [showOverlay, uidCookie]);

  const addServiceButtonClicked = async () => {
    setShowOverlay(true);
  };

  const onCloseButtonClicked = async () => {
    setShowOverlay(false);
  };
  // Function to get initials from first and last name
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
            {getInitials(customerInfo.first_name, customerInfo.last_name)}
          </div>
          <div className="flex font-medium flex-col justify-left ml-10 ">
            <p className="text-4xl  mb-4">
              {customerInfo.first_name} {customerInfo.last_name}
            </p>
            <div className="text-2xl font-medium flex items-center mb-4">
              <MdAttachEmail className="mr-4" />
              {customerInfo.email}
            </div>
            <div
              className="text-2xl font-medium flex items-center mb-4"
            >
              <MdLocalPhone className="mr-4" />
              {customerInfo.phone_num}
            </div>
          </div>
        </div>
        <h3 className="text-4xl  font-medium text-center mt-12 mb-8">My Jobs</h3>
        {jobs.length === 0 ? (
          <ul className="flex justify-center items-center">
            <li className="bg-white p-4 rounded-lg border border-medium-green shadow-md mb-6 flex items-center">
              No jobs created
            </li>
          </ul>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <li
                key={job.jid}
                className="bg-white shadow-md rounded-lg border border-medium-green flex flex-col p-4"
              >
                <span>
                  <b>Trade Type:</b> {job.trade_type}
                </span>
                <span>
                  <b>Postal Code:</b> {job.postal_code}
                </span>
                <span>
                  <b>Description: </b> {job.description}
                </span>
                <span>
                  <b>Date:</b> {new Date(job.date).toISOString().slice(0, 10)}
                </span>
                <ImageViewer apiData={job} />
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-center mt-8">
          <button
            className="flex items-center px-4 py-2 bg-light-green text-white rounded-full shadow-lg hover:bg-medium-green"
            onClick={addServiceButtonClicked}
          >
            <FaPlus className="mr-2" /> Add Job
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
