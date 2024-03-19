import React, { useState } from 'react';
import { Form, Input, Button, Col, Row } from 'reactstrap';
import { Alert } from 'reactstrap';

import './SearchForm.css';

const SearchForm = ({ filterList, searchFor}) => {
  const [formData, setFormData] = useState({
   [searchFor] : ''
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
      await filterList((formData[searchFor] === '') ? {} : {[searchFor]: formData[searchFor]});
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col>
      <Form className="SearchForm" onSubmit={handleSubmit}>
        <Row form>
          <Col md={9}>
            <Input
              type="text"
              name={searchFor}
              id="searchFor"
              placeholder="Search"
              value={formData[searchFor]}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3}>
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
      {error && <Alert color="danger">There was an unexpected error</Alert>}
      </Col>
      </Row>
    </div>
  );
};

export default SearchForm;
