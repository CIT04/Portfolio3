import React from "react";
import "./css/LoginForm.css";

const LoginForm = () => {
  return (
    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username or Email:</label>
        <input type="text" id="username" name="username"/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
        <text>Do you not have an account?</text> <a href="https://www.google.com"> <b>Sign Up</b> </a>
      </form>
    </div>
  );
};

export default LoginForm;