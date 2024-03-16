import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { useUserContext } from './UserContext';

import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, login } = useUserContext();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (!success) {
      setMessage('Invalid username or password');
    } else {
      navigate('/');
    }
  };

  if (user) {
    navigate('/');
  }


  return (
    <Row className="align-self-center">
    <Col md="3"/>
    <Col>
      <h2>Log In</h2>
      <Form className="login-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="username"
            name="username"
            id="username"
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button className="full-width-button" color="primary" type="submit">Submit</Button>
      </Form>
      {message && message !== '' && <Alert className="form-alert">{message}</Alert>}
    </Col>
    <Col md="3"/>
    </Row>
  );
};

export default LoginForm;
