import React from "react";
import LandingImage from "../../Resources/Images/LandingImage.jpg";

function JobsCard(props) {
   //pass in the entire job info here from the backend
   // const jobName = "Fix faucet"
   // const info = "I think there is something dead inside my faucet which is ruining my faucet experience."
   // const pincode = "V5A 1B2"
   // const date = "Sat, Feb 24"
   const jobName = props.name;
   const info = props.info;
   const pincode = props.pincode;
   const date = props.date;
   return (
      <div class="p-4 mx-auto mt-8 max-w-screen-lg bg-white rounded-xl shadow-md ">
         <div class="flex flex-row gap-x-5">
            <img src={LandingImage} class="w-60 h-60 rounded-xl" alt="job-iamge" />
            <div class="flex flex-col p-3 space-y-5">
               <h1 class="text-4xl subpixel-antialiased font-semibold">{jobName}</h1>
               <p class="text-3xl">{info}</p>
               <p class="text-2xl">{pincode}</p>
               <p class="text-2xl">Service needed on: {date}</p>
            </div>
         </div>
      </div>
   );
}

export default JobsCard;
