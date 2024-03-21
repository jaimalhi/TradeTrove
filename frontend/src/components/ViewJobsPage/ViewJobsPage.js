import React, { useState, useEffect } from "react";
import JobsCard from "./JobsCard";
import axios from "axios";
import SearchBar from "./SearchBar";

const SERVER_URL = "https://cmpt-372-411622.uc.r.appspot.com"; //change after hosting
async function getJobs() {

   const res = await axios.get(`${SERVER_URL}/api/tradies/jobs`)

   return res.data;

}

function ViewJobsPage() {

   const [jobs, setJobs] = useState([]);
   const [filteredJobs, setFilteredJobs] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      async function fetchData() {
         try {
            const res = await getJobs();

            setJobs(res);
            setFilteredJobs(res);

         }
         catch (err) { console.log(err) }
      }
      fetchData();

   }, []);


   useEffect(() => {
      setFilteredJobs(() => jobs.filter((j) =>
         (j.trade_type && j.trade_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
         (j.description && j.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
         (j.location && j.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
         !searchTerm))

   }, [searchTerm]);

   return (
      <div>
         <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}

         />
         {filteredJobs.map((job) => (
            <JobsCard
               key={job.jid}
               name={job.trade_type}
               info={job.description}
               pincode={job.location}
               date={new Date().toDateString()}
            />
         ))}
      </div>
   );
}

export default ViewJobsPage;
