import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import { useUserContext } from './UserContext';
import JoblyApi from './api';

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
      setMessage(true);
        
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
    <div>
    <Form onSubmit={handleSubmit}>
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
      {error && <Alert>{error}</Alert>}
      {message && <Alert>{message}</Alert>}
      <Button type="submit">Submit</Button>
    </Form>
    </div>
  );
};

export default Profile;
