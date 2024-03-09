import React, { useState } from 'react';
import { Form, FormGroup, Input, Button, Col, Row } from 'reactstrap';
import { Alert } from 'reactstrap';

import JoblyApi from './api';
import './SearchForm.css';

const SearchForm = ({ filterList}) => {
  const [formData, setFormData] = useState({
    searchFor: ''
  });
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await filterList((formData.searchFor === '') ? {} : {name: formData.searchFor});
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <section>
      <Form className="SearchForm" onSubmit={handleSubmit}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col md={10}>
            <Input
              type="text"
              name="searchFor"
              id="searchFor"
              placeholder="Search"
              value={formData.searchFor}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={2}>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
      {error && <Alert color="danger">There was an unexpected error</Alert>}
    </section>
  );
};

export default SearchForm;
