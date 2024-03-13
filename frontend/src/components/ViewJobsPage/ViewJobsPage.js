import React from "react";
import JobsCard from "./JobsCard";

function ViewJobsPage() {
   //! Jobs should have visible attributes jid, trade_type, description, & location
   //! location should be displayed using lat, long coordinates; ex. 49.282, 123.120
   //! Date is not required as it is not a attribute that exists in the database table
   const jobs = [
      {
         name: "Fix faucet",
         info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
         pincode: "V5A 1B2",
         date: "Sat, Feb 24",
         id: 1,
      },
      {
         name: "Fix faucet",
         info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
         pincode: "V5A 1B2",
         date: "Sat, Feb 24",
         id: 2,
      },
      {
         name: "Fix faucet",
         info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
         pincode: "V5A 1B2",
         date: "Sat, Feb 24",
         id: 3,
      },
      {
         name: "Fix faucet",
         info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
         pincode: "V5A 1B2",
         date: "Sat, Feb 24",
         id: 4,
      },
      {
         name: "Fix faucet",
         info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
         pincode: "V5A 1B2",
         date: "Sat, Feb 24",
         id: 5,
      },
   ];
   return (
      <div>
         {jobs.map((job) => (
            <JobsCard
               key={job.id}
               name={job.name}
               info={job.info}
               pincode={job.pincode}
               date={job.pincode}
            />
         ))}
      </div>
   );
}

export default ViewJobsPage;
