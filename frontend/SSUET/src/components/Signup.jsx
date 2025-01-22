import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// Styled components
const SignUpContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  color: #2b6777;
  padding: 20px;
  margin: 50px auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
  height: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #2b6777;
`;

const FormSection = styled.div`
  margin-bottom: 15px;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  padding: 10px;
  background-color: #2b6777;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1a4856;
  }
`;

const ResponsiveForm = styled.form`
  width: 100%;

  @media (min-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }
`;

const SignUp = () => {
    const backendUrl = process.env.BACKEND_URL;
    console.log(backendUrl);
  const [accountType, setAccountType] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    location: '',
    password: ''
  });
  const [ngoData, setNgoData] = useState({
    name: '',
    location: '',
    email: '',
    password: ''
  });

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleNgoChange = (e) => {
    setNgoData({ ...ngoData, [e.target.name]: e.target.value });
  };

  const submitUserForm = () => {
    fetch(`${backendUrl}/createUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
      .then((response) => response.json())
      .then(() => alert('User registration successful!'))
      .catch((error) => console.error('Error:', error));
  };

  const submitNgoForm = () => {
    fetch('https://api.example.com/createNgo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ngoData)
    })
      .then((response) => response.json())
      .then(() => alert('NGO registration successful!'))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <SignUpContainer>
      <Title>Sign Up</Title>
      <FormSection>
        <InputLabel htmlFor="accountType">I am a:</InputLabel>
        <FormControl fullWidth>
          <Select
            id="accountType"
            value={accountType}
            onChange={handleAccountTypeChange}
            fullWidth
          >
            <MenuItem value="">-- Select --</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="ngo">NGO</MenuItem>
          </Select>
        </FormControl>
      </FormSection>

      {accountType === 'user' && (
        <ResponsiveForm>
          <FormSection>
            <TextField
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleUserChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Gender"
              name="gender"
              value={userData.gender}
              onChange={handleUserChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Age"
              type="number"
              name="age"
              value={userData.age}
              onChange={handleUserChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Phone Number"
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleUserChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Location"
              name="location"
              value={userData.location}
              onChange={handleUserChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleUserChange}
              fullWidth
              required
            />
          </FormSection>
          <FullWidthButton onClick={submitUserForm}>Register</FullWidthButton>
        </ResponsiveForm>
      )}

      {accountType === 'ngo' && (
        <ResponsiveForm>
          <FormSection>
            <TextField
              label="Name"
              name="name"
              value={ngoData.name}
              onChange={handleNgoChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Location"
              name="location"
              value={ngoData.location}
              onChange={handleNgoChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={ngoData.email}
              onChange={handleNgoChange}
              fullWidth
              required
            />
          </FormSection>
          <FormSection>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={ngoData.password}
              onChange={handleNgoChange}
              fullWidth
              required
            />
          </FormSection>
          <FullWidthButton onClick={submitNgoForm}>Register</FullWidthButton>
        </ResponsiveForm>
      )}
    </SignUpContainer>
  );
};

export default SignUp;
