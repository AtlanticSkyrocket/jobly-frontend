import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText  } from 'reactstrap';

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
    <section className='col-md-10'>
      <SearchForm filterList={searchCompanyList}/>
        <ListGroup className='CompanyList-company'>
          {companies.map((company) => (
            <ListGroupItem className='CompanyList-item' key={company.handle}
              action
              to={`/companies/${company.handle}`}
              tag={Link}
            >
              <ListGroupItemHeading>{company.name}</ListGroupItemHeading>
              <ListGroupItemText>
                {company.description}
              </ListGroupItemText>
            </ListGroupItem>
          ))}
        </ListGroup>
    </section>
  );
};

export default CopanyList;
