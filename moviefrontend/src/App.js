import './App.css';
import Header from './pages/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp.jsx';
import UserPage from './pages/UserPage.jsx';
import SearchResultColumn from './pages/SearchResultColumn.jsx';
import React from "react"
//import ReactDOM from "react-dom/client"
//mport App from "./App"
//import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/Login.jsx";
import MovieCarousel from './components/MovieCarousel.jsx';
import Team from "./pages/Team.jsx";
import { useState } from 'react';
import { useEffect } from 'react';
<<<<<<< Updated upstream
import SearchResultColumn from './SearchResultColumn.jsx';
import Actor from './pages/Actor.jsx';

=======
>>>>>>> Stashed changes


function App() {

  const [mediaCount, setMediaCount] = useState(6);  // 
  const [medias, setMedias] = useState([]); // The list of users

  const[actorCount, setActorCount] = useState(5);
  const[actors, setActors]=useState([]);

  const [searchCount, setSearchCount] = useState(6);  // 
  const [search, setSearch] = useState([]); // The list of users

  function loadMedias () {
    fetch("http://localhost:5001/api/media/")
      .then(res => res.json())
      .then(json => {setMedias(json.items);});
  }
  function loadActors (){
    fetch("http://localhost:5001/api/person/")
    .then(res=>res.json())
    .then(json => {setActors(json.items);});
  }

  function loadSearch () {
    fetch("http://localhost:5001/api/media/search?page=0&pageSize=10&Type=movie&search=tom holland")
      .then(res => res.json())
      .then(json => {setSearch(json.items);});
  }

  useEffect(loadMedias, [mediaCount]); // When count changes, load users again
  useEffect(loadSearch, [searchCount]);
  useEffect(loadActors, [actorCount]);


  // Background color and padding


  return (
    <div className="App">
      
      {/* Render the Header component */}
      <Header />
    
      {/* Routes */}
      <h1>Todays featured</h1>
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

      <UserPage searchResults={search}/>

<<<<<<< Updated upstream
      {/* Team page */}
      <Team/>

      <Actor actors= {actors}/>
      
=======

      <SearchResultColumn searchResults={search}/>


      {/* Team page */}
      <Team/>

      

>>>>>>> Stashed changes

    </div>
  );
  
}


export default App;