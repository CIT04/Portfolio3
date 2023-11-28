import './App.css';
import Header from './pages/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp.jsx';

import React from "react"
//import ReactDOM from "react-dom/client"
//mport App from "./App"
//import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/Login.jsx"
import MovieCarousel from './components/MovieCarousel.jsx';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [count, setCount] = useState(6);  // Load this many users
  const [medias, setMedias] = useState([]); // The list of users

  function loadMedias () {
    fetch("http://localhost:5001/api/media/")
      .then(res => res.json())
      .then(json => {setMedias(json.items);});
  }

  useEffect(loadMedias, [count]); // When count changes, load users again


  // Background color and padding
  const appStyle = {
    
    padding: '0px', // Set your desired padding
  };

  return (
    <div className="App" style={appStyle}>
      
      {/* Render the Header component */}
      <Header />
    
      {/* Routes */}
      
      
      {/* Todays featured */}
      <h1>Todays featured</h1>
      <MovieCarousel medias={medias} />
      
      {/* IMDB top 10 */}
      <h1>IMDB top 10</h1>
      <MovieCarousel medias={medias} />
  
      {/* Log in page */}
      <LoginForm />
  
      {/* Sign up page */}
      <SignUp />
    </div>
  );
  
}


export default App;