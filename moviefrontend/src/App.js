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
import SearchResultColumn from './SearchResultColumn.jsx';

function App() {

  const [mediaCount, setMediaCount] = useState(6);  // 
  const [medias, setMedias] = useState([]); // The list of users

  const [searchCount, setSearchCount] = useState(6);  // 
  const [search, setSearch] = useState([]); // The list of users

  function loadMedias () {
    fetch("http://localhost:5001/api/media/")
      .then(res => res.json())
      .then(json => {setMedias(json.items);});
  }

  function loadSearch () {
    fetch("http://localhost:5001/api/media/search?page=0&pageSize=10&Type=movie&search=spider-man")
      .then(res => res.json())
      .then(json => {setSearch(json.items);});
  }

  useEffect(loadMedias, [mediaCount]); // When count changes, load users again
  useEffect(loadSearch, [searchCount]);


  // Background color and padding


  return (
    <div className="App">
      
      {/* Render the Header component */}
      <Header />
    
      {/* Routes */}

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