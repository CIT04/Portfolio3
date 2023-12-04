import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext';
import "./css/LoginForm.css"

const LoginForm = () => {
  const { setToken } = useContext(UserContext);
  const navi = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const loginCredentials = {
      Username: username,
      Password: password,
    };

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
    }
  };
  return (
    <div id="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username or Email:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
        <text>
          Do you not have an account?{' '}
          {/* Display relevant information here */}
        </text>
        <NavLink to="/signup">
          <b>Sign Up</b>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginForm;
