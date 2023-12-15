import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext';
import './css/LoginForm.css';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import DataAccess from '../accessLayer/DataAccess';

const LoginForm = () => {
  const { setToken } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dataAccess = new DataAccess();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const json = await dataAccess.loginUser(username, password);
      setToken(json);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div id="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username or Email:</label>
        <input
          type="text"
          id="username"
          name="username"
          className={error ? 'form-control is-invalid' : 'form-control'}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
        />
        {error && <div className="invalid-feedback">{error}</div>}
        <input type="submit" value="Submit" />
        <text>
          Do you not have an account?{' '}
        </text>
        <NavLink to="/signup">
          <b>Sign Up</b>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginForm;
