import "./css/LoginForm.css";
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../components/UserContext';
import React, { useContext, useEffect } from 'react';


const LoginForm = () => {
  const { userToken, setToken } = useContext(UserContext);
  const [user, setUser] = useState(null);
  
  
 
  const username = "normal bruger";
  const password = "bent123";
  const loginCredentials = {
    Username: username,
    Password: password
  };
  function login() {
    fetch("http://localhost:5001/api/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCredentials)
    })
      .then(res => res.json())
      .then(json => {setToken(json);})
      .catch(error => console.error('Error fetching data:', error));
  }
  useEffect(() => {
    login();
  }, []); 



  console.log(userToken)



  return (
    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username or Email:</label>
        <input type="text" id="username" name="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
        <text>Do you not have an account? <p>{userToken != null && userToken.token}</p></text> <NavLink to='/signup'><b>Sign Up</b></NavLink>
      </form>
    </div>
  );
};

export default LoginForm;