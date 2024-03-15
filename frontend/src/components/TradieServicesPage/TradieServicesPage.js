import React from "react";
import LandingImage from "../../Resources/Images/LandingImage.jpg";
import { FaWrench, FaPlus } from "react-icons/fa";

function TradieServicesPage() {
  const placeholderTradie = {
    name: "James",
    lastname: "John",
    age: "34",
    email: "example@demo.com",
    services: ["plumbing", "cleaning", "mounting tv"],
  };

  return (
    <div className="p-24 mx-auto mt-8 max-w-screen-lg">
      <div className="p-5 bg-white rounded-xl shadow-md flex flex-row items-center">
        <img
          src={LandingImage}
          className="w-60 h-60 rounded-full ml-14"
          alt="job-image"
        />
        <div className="flex flex-col justify-between ml-10">
          <p className="text-3xl text-center">
            {placeholderTradie.name} {placeholderTradie.lastname}
          </p>
          <p className="text-3xl text-center">
            {placeholderTradie.age} years old
          </p>
          <p className="text-3xl text-center">{placeholderTradie.email}</p>
        </div>
      </div>
      <h3 className="text-4xl text-center mt-12 mb-8">My Services</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {placeholderTradie.services.map((service, index) => (
          <li
            key={index}
            className="bg-white shadow-md rounded-lg flex items-center p-4 hover:bg-green-800"
          >
            <FaWrench className="text-green-600 mr-4" size={30} />
            <span className="text-xl">{service}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-800">
          <FaPlus className="mr-2" /> Add Service
        </button>
      </div>
    </div>
  );
}

export default TradieServicesPage;
