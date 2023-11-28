import './App.css';
import Header from './pages/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp.jsx';
import UserPage from './pages/UserPage.jsx';

import React from "react"
//import ReactDOM from "react-dom/client"
//mport App from "./App"
//import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/Login.jsx";
import MovieCarousel from './components/MovieCarousel.jsx';
import Team from "./pages/Team.jsx";
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
      
      {/*--------------------Home Page----------------------*/}

      <br></br>
      <br></br>
      <br></br>

      {/* Todays featured */}
      <h1>Todays featured</h1>
      <MovieCarousel medias={medias} />

      <br></br>
      
      {/* IMDB top 10 */}
      <h1>IMDB top 10</h1>
      <MovieCarousel medias={medias} />

      {/*--------------------Log In Page----------------------*/}
  
      <LoginForm />

      {/*--------------------Sign Up Page----------------------*/}
  
      <SignUp />

      {/*--------------------User Page----------------------*/}

      <h1>History</h1>
      <MovieCarousel medias={medias} />

      <br></br>
      <br></br>

      <h1>Bookmarks</h1>
      <MovieCarousel medias={medias} />

      <UserPage />



      {/* Team page */}
      <Team/>

    </div>
  );
  
}


export default App;