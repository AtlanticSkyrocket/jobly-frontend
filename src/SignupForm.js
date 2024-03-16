import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { useUserContext } from './UserContext';
import JoblyApi from './api';

import './SignupForm.css';

const SignupForm = () => {
  const { setUser } = useUserContext();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await JoblyApi.loginUser(formData);
    if (results === 'error') {
      console.log('Invalid username or password');
    } else {
      JoblyApi.token = results;
      setUser({ username: formData.username });
      console.log('User logged in');
    }
  };

  return (
    <Row className="align-self-center">
      <Col md="3" />
      <Col>
        <h2>Sign Up</h2>
        <Form className="signup-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstname">First Name</Label>
            <Input
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Last Name</Label>
            <Input
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <Button className="full-width-button" color="primary" type="submit">Sign Up</Button>
        </Form>
      </Col>
      <Col md="3" />
    </Row>
  );
};

export default SignupForm;
