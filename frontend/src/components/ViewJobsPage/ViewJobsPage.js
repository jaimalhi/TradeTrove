import React, { useState, useEffect } from "react";
import JobsCard from "./JobsCard";
import axios from "axios";
import SearchBar from "./SearchBar";
import { baseURL } from "../../utils/apiHelper";

async function getJobs() {
   const res = await axios.get(`${baseURL}/api/tradies/jobs`);
   console.log(res.data);
   return res.data;
}

function ViewJobsPage() {
   const [jobs, setJobs] = useState([]);
   const [filteredJobs, setFilteredJobs] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [locationTerm, setLocationTerm] = useState("");
   const [pincodeDict, setpincodeDict] = useState({ "": "" });

   useEffect(() => {
      async function fetchData() {
         try {
            const res = await getJobs();

            setJobs(res.jobs);
            setFilteredJobs(res.jobs);
            setpincodeDict(res.pincodeCityDict);
         } catch (err) {
            console.log(err);
         }
      }
      fetchData();
   }, []);

   useEffect(() => {
      setFilteredJobs(() =>
         jobs.filter((j) => {
            const postalCode = j.postal_code;
            const postalCodeLower = pincodeDict[postalCode]?.toLowerCase();
            console.log(pincodeDict);
            const searchTermLower = searchTerm.toLowerCase();
            const locationTermLower = locationTerm.toLowerCase();

            const tradeTypeMatches = j.trade_type.toLowerCase().includes(searchTermLower);
            const descriptionMatches = j.description.toLowerCase().includes(searchTermLower);
            const locationMatches = postalCodeLower
               ? postalCodeLower.includes(locationTermLower)
               : false;

            if (searchTerm === "" && locationTerm === "") {
               return true;
            }
            if (searchTerm === "") {
               return locationMatches;
            }
            if (locationTerm === "") {
               return tradeTypeMatches || descriptionMatches;
            }
            return (tradeTypeMatches || descriptionMatches) && locationMatches;
         })
      );
   }, [searchTerm, locationTerm, jobs, pincodeDict]);

   return (
      <div>
         <SearchBar
            searchTerm={searchTerm}
            locationTerm={locationTerm}
            onSearchTermChange={setSearchTerm}
            onLocationTermChange={setLocationTerm}
         />
         {filteredJobs.map((job) => (
            <JobsCard
               key={job.jid}
               name={job.trade_type}
               info={job.description}
               pincode={job.postal_code}
               imageId={job.image}
               date={new Date(job.date).toDateString()}
               email={job.email}
               phoneNum={job.phone_num}
               city={pincodeDict[job.postal_code]}
            />
         ))}
      </div>
   );
}

export default ViewJobsPage;
