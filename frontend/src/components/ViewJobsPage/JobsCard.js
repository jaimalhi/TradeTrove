import React from "react";
import LandingImage from "../../Resources/Images/LandingImage.jpg";

function JobsCard(props) {
   const jobName = props.name;
   const info = props.info;
   const pincode = props.pincode;
   const date = props.date;

   return (
     <div>
       <div className="p-4 mx-auto mt-8 max-w-screen-lg bg-white rounded-xl shadow-md pt-16">
         <div className="flex flex-row gap-x-5">
           <img
             src={LandingImage}
             className="w-60 h-60 rounded-xl"
             alt="job-iamge"
           />
           <div className="flex flex-col p-3 space-y-5">
             <h1 className="text-4xl subpixel-antialiased font-semibold">
               {jobName}
             </h1>
             <p className="text-3xl">{info}</p>
             <p className="text-2xl">{pincode}</p>
             <p className="text-2xl">Service needed on: {date}</p>
           </div>
         </div>
       </div>
     </div>
   );
}

export default JobsCard;
