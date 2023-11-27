
import './App.css';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import MovieCarousel from './MovieCarousel.jsx';
import Login from './Login'
import SignUp from './SignUp'


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
    backgroundColor: '#8484B0', // Set your desired color
    padding: '0px', // Set your desired padding
  };

  return (
    <div className="App" style={appStyle}>

      {/* Render the Header component */}
      <Header />

      {/* Render the Header component */}
      <h1>Todays featured</h1>
      <MovieCarousel medias={medias}/>
      <h1>IMDB top 10</h1>
      <MovieCarousel medias={medias}/>

      {/* Log in page */}
      <Login />

      {/* Sign up page */}
      <SignUp />

      </div>
    
  );
}

export default App;