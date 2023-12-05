import './App.css';
import Header from './pages/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './pages/SignUp.jsx';
import UserPage from './pages/UserPage.jsx';
import SearchResultColumn from './pages/SearchResultColumn.jsx';
import MediaDisplay from './pages/MediaDisplay.jsx';
import React from "react";
//import ReactDOM from "react-dom/client"
//mport App from "./App"
//import { Route, Routes } from "react-router-dom"
import LoginForm from "./pages/Login.jsx";
import MovieCarousel from './components/MovieCarousel.jsx';
import Team from "./pages/Team.jsx";
import { useState } from 'react';
import { useEffect } from 'react';
import Actor from './pages/Actor.jsx';
import { Route, Routes } from 'react-router';
import SingleActor from './pages/SingleActor.jsx';



function App() {

  

  
  
  const [mediaCount, setMediaCount] = useState(6);  // 
  const [medias, setMedias] = useState([]); // The list of users

  const[actorCount, setActorCount] = useState(5);
  const[actors, setActors]=useState([]);

  const [searchCount, setSearchCount] = useState(6);  // 
   

 // const [selectedMedia, setSelectedMedia] = useState(["tt0795176"]);
 

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

  useEffect(loadMedias, [mediaCount]); // When count changes, load users again
 
  useEffect(loadActors, [actorCount]);


  return (
    <div className="App">
      
      {/* Render the Header component */}

      <Header />

      {/* Routes */}
      <Routes>
      <Route path="/" element={ <MovieCarousel medias={medias} />}/>
      <Route path="/media/:mediaId" element={<MediaDisplay />} />
      <Route path="/login" element={  <LoginForm />}/>
      <Route path="/signup" element={  <SignUp />}/>
      {/* <Route path="/search" element={  <SearchResultColumn searchResults={search}/>}/> */}
      <Route path="/search/:searchstring" element={<SearchResultColumn  />} />
      <Route path="/actor/:id" element={  <Actor/>}/>
      <Route path="/user" element={  <UserPage />}/>
        <Route path="/user" element={  <UserPage />}/>
        <Route path="/team" element={  <Team />}/>
      <Route path="/actor/:actorId" element={<SingleActor />} />


      </Routes>
     
    
      {/* Routes */}
     
     

     
      {/*--------------------Log In Page----------------------*/}
  
      

      {/*--------------------Sign Up Page----------------------*/}
  
      



      {/*------User Page--------

      <h1>History</h1>
      <MovieCarousel medias={medias} />

      <br></br>
      <br></br>

      <h1>Bookmarks</h1>
      <MovieCarousel medias={medias} />

      <UserPage searchResults={search}/>

      ------------------------*/}
      
    </div>
  );
  
}

export default App;