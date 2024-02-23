import React from "react"
import JobsCard from "./JobsCard"

function ViewJobsPage(){
    const jobs = [
      {
        name: "Fix faucet",
        info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
        pincode: "V5A 1B2",
        date: "Sat, Feb 24",
      },
      {
        name: "Fix faucet",
        info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
        pincode: "V5A 1B2",
        date: "Sat, Feb 24",
      },
      {
        name: "Fix faucet",
        info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
        pincode: "V5A 1B2",
        date: "Sat, Feb 24",
      },
      {
        name: "Fix faucet",
        info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
        pincode: "V5A 1B2",
        date: "Sat, Feb 24",
      },
      {
        name: "Fix faucet",
        info: "I think there is something dead inside my faucet which is ruining my faucet experience.",
        pincode: "V5A 1B2",
        date: "Sat, Feb 24",
      }
    ];
    return (
        <div>
            {jobs.map(job =>(
                <JobsCard name={job.name} info={job.info} pincode={job.pincode} date={job.pincode}/>
             ))}
        </div>
    )
}

export default ViewJobsPage