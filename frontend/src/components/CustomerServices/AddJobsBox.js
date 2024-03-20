import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:8080";

const AddJobsBox = ({ onCloseButtonClicked }) => {
   const [tradeType, setTradeType] = useState("");
   const [postalCode, setPostalCode] = useState("");
   const [description, setDescription] = useState("");
   const [date, setDate] = useState(new Date());
   const [imageTitle, setImageTitle] = useState("");
   const [imageByteData, setImageByteData] = useState();

   const uidCookie = Cookies.get("uid");

   const handleSubmit = async (e) => {
      setDate(new Date().toISOString().split("T")[0]);
      try {
         axios
            .post(
               `${baseURL}/api/customers/create-job`,
               {
                  uid: uidCookie,
                  trade_type: tradeType,
                  postalCode: postalCode,
                  description: description,
                  date: date,
                  title: imageTitle,
                  imageData: imageByteData,
               },
               {
                  withCredentials: true,
               }
            )
            .then(() => {
               console.log("received response");
               onCloseButtonClicked();
            });
      } catch (error) {
         console.log(`Error ${error}`);
      }
   };

   function handleChange(e) {
      const { name, value } = e.target;

      switch (name) {
         case "title":
            setImageTitle(value);
            break;
         case "tradeType":
            setTradeType(value);
            break;
         case "postalCode":
            setPostalCode(value);
            break;
         case "description":
            setDescription(value);
            break;
         default:
            break;
      }
   }

   function handleImageChange(e) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
         // Use reader.result holds base64 encoded string
         setImageByteData(reader.result);
      };
      reader.readAsDataURL(file);
   }

   return (
      <div>
         <IoIosCloseCircle onClick={onCloseButtonClicked} className="mb-3 w-7 h-7 text-red-600" />
         <input
            className="border-2 border-gray-300 p-2 w-full rounded-md"
            type="text"
            placeholder="Trade Type"
            name="tradeType"
            onChange={handleChange}
            value={tradeType}
         />
         <input
            className="border-2 border-gray-300 p-2 w-full rounded-md"
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            onChange={handleChange}
            value={postalCode}
            maxLength="6"
         />
         <textarea
            className="border-2 border-gray-300 p-2 w-full rounded-md"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={description}
         />
         <input
            className="border-2 border-gray-300 p-2 w-full rounded-md"
            type="text"
            placeholder="Image Title"
            name="title"
            onChange={handleChange}
            value={imageTitle}
         />
         <label className="underline">Upload an image of the job</label>
         <input type="file" name="image" onChange={handleImageChange} />
         <div className="flex justify-center">
            <button
               onClick={handleSubmit}
               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
               Submit
            </button>
         </div>
      </div>
   );
};

export default AddJobsBox;
