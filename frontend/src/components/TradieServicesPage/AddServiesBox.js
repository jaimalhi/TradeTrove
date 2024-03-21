import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { baseURL } from "../../utils/apiHelper";

const AddServicesBox = ({ onCloseButtonClicked }) => {
   const [skillName, setSkillName] = useState("");

   const handleSubmit = async (e) => {
      try {
         axios
            .post(
               `${baseURL}/api/tradies/addSkill`,
               {
                  data: skillName,
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

   const handleChange = async (e) => {
      setSkillName(e.target.value);
   };
   return (
      <div>
         <IoIosCloseCircle onClick={onCloseButtonClicked} className="mb-3 w-7 h-7 text-red-600" />
         <input
            type="text"
            placeholder="Add Task"
            name="skillName"
            onChange={handleChange}
            value={skillName}
         />
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

export default AddServicesBox;
