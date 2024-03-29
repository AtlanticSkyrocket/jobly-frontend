import React, { useState, useEffect } from 'react';

import JobCard from './JobCard.js';
import JoblyApi from './api.js';
import SearchForm from './SearchForm.js';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchJobList = async (formData) => {
    try {
      const filteredJobs = await JoblyApi.getJobs(formData);
      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsRes = await JoblyApi.getJobs();
        setJobs(jobsRes);

      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <section className='col-md-10'>
      <SearchForm filterList={searchJobList} searchFor="title"/>
        <div>
          {jobs && jobs.map((job) => 
            <JobCard job={job} />
          )}
        </div>
    </section>
  );
};

export default JobList;