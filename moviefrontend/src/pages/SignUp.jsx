import React from "react";
import "./css/SignUpForm.css";
import { NavLink, useNavigate } from 'react-router-dom';

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
        <text>Do you already have an account?</text> <NavLink  to ='/login'><b>Log in</b></NavLink>
        <input type="submit" value="Submit" />
        
      </form>
    </div>
  );
};

export default SignUpForm;