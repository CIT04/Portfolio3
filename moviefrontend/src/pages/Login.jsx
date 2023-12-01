import React, { useEffect } from "react";
import "./css/LoginForm.css";
import { useState } from 'react';


const LoginForm = () => {
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
      .then(json => {setUser(json);})
      .catch(error => console.error('Error fetching data:', error));
  }
  useEffect(() => {
    login();
  }, []); // empty dependency array to execute only once on mount

  // useEffect(() => {
   
  // }, [user]); // log user when it changes

  // console.log("loginCredentials");
  console.log(JSON.stringify(loginCredentials));



  return (
    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username or Email:</label>
        <input type="text" id="username" name="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
        <text>Do you not have an account? <p>{user != null && user.token}</p></text> <a href="https://www.google.com"> <b>Sign Up</b> </a>
      </form>
    </div>
  );
};

export default LoginForm;