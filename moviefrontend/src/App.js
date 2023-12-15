import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './pages/Header.jsx';
import MovieCard from './components/MovieCard';
import MediaDisplay from './pages/MediaDisplay';
import LoginForm from './pages/Login';
import SignUp from './pages/SignUp';
import SearchResultColumn from './pages/SearchResultColumn';
import UserPageWIP from './pages/UserPageWIP';
import Team from './pages/Team';
import SingleActor from './pages/SingleActor';
import Trailer from './components/Trailer';
import Actor from './pages/Actor.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage.jsx'; 
import MovieCarousel from './components/MovieCarousel';

function App() {
  //call all page components
  return (
    <div className="app-container">
      <Header />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<HomePage  />} 
        />
        <Route path="/" element={[<Trailer movieTitle="Css for Dummies" />]} />
        <Route path="/media/:mediaId" element={<MediaDisplay />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search/:page/:pageSize/:searchstring/:type" element={<SearchResultColumn />} />
        <Route path="/user" element={<UserPageWIP />} />
        <Route path="/team" element={<Team />} />
        <Route path="/actor/:actorId" element={<SingleActor />} />
        <Route path="/media/team/:mediaId" element={<Team/>} />
        <Route path="/media/:mediaId" component={MediaDisplay} />
      </Routes>
    </div>
  );
}

export default App;