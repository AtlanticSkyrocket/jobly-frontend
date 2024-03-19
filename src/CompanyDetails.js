import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import JoblyApi from './api';
import JobCard from './JobCard';

const CompanyDetails = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyRes = await JoblyApi.getCompany(handle);
        setCompany(companyRes || {});
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [handle]);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className='col-md-8'>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <div className='CompanyDetails-jobs'>
        {company.jobs && company.jobs.map((job) => (
            <JobCard job={job} />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetails;
