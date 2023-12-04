
import "./css/SignUpForm.css";
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext';

const SignUpForm = () => {
  const { setToken } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navi = useNavigate();
  
  const postLogin = async (loginCredentials) => {
    try {
      const response = await fetch('http://localhost:5001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const json = await response.json();
      setToken(json);
  
      // Navigate to "/" after successful login
      navi('/');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Login failed. Please check your credentials.');
    }
  };
  
  const postSignup = async (signupCredentials) => {
    try {
      const response = await fetch('http://localhost:5001/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupCredentials),
      });
  
      if (!response.ok) {
        throw new Error('Signup failed');
      }
  
      console.log('Signed up');
  
      // Call the postLogin function after successful signup
      await postLogin({
        // Use the login credentials of the user who just signed up
        username: signupCredentials.Username,
        password: signupCredentials.Password,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Signup failed. Please check your credentials.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const signupCredentials = {
      Username: event.target.username.value,
      Password: event.target.password.value,
      Firstname: event.target.firstname.value, // Use 'firstname' instead of 'username'
      Lastname: event.target.lastname.value,   // Use 'lastname' instead of 'username'
      Dob: event.target.dob.value,
      Email: event.target.email.value,
    };
  
    // Call the postSignup function with signup credentials
    await postSignup(signupCredentials);
  };
  
  return (
    <div id="signup-form">
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Username" />
      <label htmlFor="firstname">First name</label>
      <input type="text" id="firstname" name="firstname" placeholder="First name" />
      <label htmlFor="lastname">Last name</label>
      <input type="text" id="lastname" name="lastname" placeholder="Last name" />
      <label htmlFor="email">Email</label>
      <input type="text" id="email" name="email" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="At least 8 characters, 1 symbol, 1 big letter" />
      <label htmlFor="rePassword">Re-enter password:</label>
      <input type="password" id="rePassword" name="rePassword" />
      <label htmlFor="dob">Birthday</label>
      <input type="text" id="dob" name="dob" placeholder="dd/mm/yyyy" />
      <p>Do you already have an account? <NavLink to="/login"><b>Log in</b></NavLink></p>
      <input type="submit" value="Submit" />
    </form>
  </div>
  );
  
};

export default SignUpForm;