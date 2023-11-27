import React from "react";
import "./SignUpForm.css";
import NavLink from "react-bootstrap/esm/NavLink";

const SignUpForm = () => {
  return (
    <div id="signup-form">
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="username">Your name</label>
        <input type="text" id="username" name="username" placeholder="First and last name"/>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="At least- 8 characters, 1 symbol, 1 big letter"/>
        <label htmlFor="password">Re-enter password:</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="dob">Birthday</label>
        <input type="text" id="dob" name="dob" placeholder="dd/mm/yyyy"/>
        <input type="submit" value="Submit" />
        <text>Do you already have an account?</text> <a href="https://www.google.com"> <b>Log in</b> </a>
      </form>
    </div>
  );
};

export default SignUpForm;