import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { useUserContext } from './UserContext';
import JoblyApi from './api';

import './Profile.css';

const Profile = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useUserContext();
  const [userDetails, setUserDetails] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const detailsToUpdate = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email
      };
      const results = await JoblyApi.updateUserProfile(user.username, detailsToUpdate);

    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    async function getUserDetails() {
      const userRes = await JoblyApi.getCurrentUser(user.username);
      setUserDetails({
        username: userRes.username,
        firstName: userRes.firstName,
        lastName: userRes.lastName,
        email: userRes.email
      });
    }
    getUserDetails();
  }, []);

  return (
    <Row className="align-self-center">
      <Col md="3" />
      <Col md="6" className="align-items-center">
        <h1 className="text-left">Profile</h1>
        <Form className="profile-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={userDetails.username}
              disabled
            />
          </FormGroup>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </FormGroup>
          {error && error !== '' && <Alert className="form-alert">{error}</Alert>}
          <Button className="full-width-button" color="primary" type="submit">Save Changes</Button>
        </Form>
      </Col>
      <Col md="3" />
    </Row>
  );
};

export default Profile;
