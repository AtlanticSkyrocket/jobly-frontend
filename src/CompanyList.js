import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText  } from 'reactstrap';

import SearchForm from './SearchForm';

import JoblyApi from './api';
import './CompanyList.css';

const CopanyList = () => {
  const [companies, setCompanies] = useState([]);

  const searchCompanyList = async (formData) => {
    try {
      const companies = await JoblyApi.getCompanies(formData);
      setCompanies(companies);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <section className='col-md-8'>
      <SearchForm filterList={searchCompanyList}/>
      <div className='CompanyList-company'>
        {companies.map((company) => (
          <Card className='mb-3' key={company.handle} tag={Link} to={`/companies/${company.handle}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <CardBody>
              <CardTitle tag="h6">{company.name}</CardTitle>
              <CardText>{company.description}</CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CopanyList;
