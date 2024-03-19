import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from './UserContext';

import './SignupForm.css';

const SignupForm = () => {
  const { singUpUser } = useUserContext();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpRes = await singUpUser(formData);
    if (signUpRes) {
      console.log('User logged in');
      navigate('/');
    } else {
      console.log('Invalid username or password');
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
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastname">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
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
