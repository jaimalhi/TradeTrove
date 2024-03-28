import React, { useState, useEffect } from "react";
import JobsCard from "./JobsCard";
import axios from "axios";
import SearchBar from "./SearchBar";
import { baseURL } from "../../utils/apiHelper";

async function getJobs() {
   const res = await axios.get(`${baseURL}/api/tradies/jobs`);

   return res.data;
}

function ViewJobsPage() {
   const [jobs, setJobs] = useState([]);
   const [filteredJobs, setFilteredJobs] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [locationTerm, setLocationTerm] = useState("");
   const [pincodeDict, setpincodeDict] = useState({"":""});


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
        jobs.filter(
          (j) =>
            (((j.trade_type && j.trade_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (j.description && j.description.toLowerCase().includes(searchTerm.toLowerCase())))) &&
              (pincodeDict[j.postal_code].toLowerCase().includes(locationTerm.toLowerCase())) 
        )
      );
   }, [searchTerm,locationTerm]);
   
   

   return (
      <div>
         <SearchBar searchTerm={searchTerm} locationTerm={locationTerm} onSearchTermChange={setSearchTerm} onLocationTermChange={setLocationTerm} />
         {filteredJobs.map((job) => (
            <JobsCard
               key={job.jid}
               name={job.trade_type}
               info={job.description}
               pincode={job.postal_code}
               date={new Date(job.date).toDateString()}
            />
         ))}
      </div>
   );
}

export default ViewJobsPage;
