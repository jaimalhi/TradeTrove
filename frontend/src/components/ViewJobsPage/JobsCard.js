import React, { useEffect, useState } from "react";
import ImageViewer from "../../utils/ImageViewer";
import { baseURL } from "../../utils/apiHelper";
import { MdAttachEmail, MdLocalPhone } from "react-icons/md";

function JobsCard(props) {
   const [imageData, setImageData] = useState(null);
   const jobName = props.name;
   const info = props.info;
   const pincode = props.pincode;
   const date = props.date;
   const imageId = props.imageId;
   const phoneNum = props.phoneNum;
   const email = props.email;


   // /getJobImage/:id
   async function getImage() {
      const res = await fetch(`${baseURL}/api/tradies/getJobImage/${imageId}`);
      const data = await res.json();
      return data;
   }

   useEffect(() => {
      async function fetchData() {
         try {
            const res = await getImage();
            setImageData(res);
         } catch (err) {
            console.log(err);
         }
      }
      fetchData();
   }, []);

   return (
     <div>
       <div className="p-4 mx-auto mt-8 max-w-screen-lg bg-white rounded-xl shadow-md pt-16">
         <div className="flex flex-row gap-x-5">
           {/* <img src={LandingImage} className="w-60 h-60 rounded-xl" alt="job-iamge" /> */}
           <ImageViewer apiData={imageData} />
           <div className="flex flex-col p-3 space-y-5">
             <h1 className="text-4xl subpixel-antialiased font-semibold">
               {jobName}
             </h1>
             <a
               href={`mailto:${email}`}
               className="font-medium text-2xl flex items-center text-blue-800"
             >
               <MdAttachEmail className="mr-4 font-medium" />
               {email}
             </a>
             <a
               href={`tel:${phoneNum}`}
               className="font-medium text-2xl flex items-center  text-blue-800"
             >
               <MdLocalPhone className="mr-4 font-medium" />
               {phoneNum}
             </a>
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
