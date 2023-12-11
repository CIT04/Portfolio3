import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header.jsx';
import MovieCard from '../components/MovieCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/HomePage.css';

function HomePage() {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    loadMedias();
  }, []);

  function loadMedias() {
    fetch('http://localhost:5001/api/media/')
      .then((res) => res.json())
      .then((json) => {
        setMedias(json.items);
      });
  }

  return (
    <div className="app-container">
      <Header />

      <section className="fractured-section popular-section">
        <h2>Popular Movies</h2>
        <div className="movie-grid">
          {medias.map((media) => (
            <div key={media.id} className="movie-card">
              <NavLink to={`/media/${media.id}`} className="nav-link">
                <MovieCard
                  title={media.title}
                  plot={media.plot}
                  poster={media.poster}
                  year={media.year}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      <section className="fractured-section series-section">
        <h2>Popular Series</h2>
        <div className="movie-grid">
          {medias.map((media) => (
            <div key={media.id} className="movie-card">
              <NavLink to={`/media/${media.id}`} className="nav-link">
                <MovieCard
                  title={media.title}
                  plot={media.plot}
                  poster={media.poster}
                  year={media.year}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      <section className="fractured-section top-rated-section">
        <h2>Top Rated Movies</h2>
        <div className="movie-grid">
          {medias.map((media) => (
            <div key={media.id} className="movie-card">
              <NavLink to={`/media/${media.id}`} className="nav-link">
                <MovieCard
                  title={media.title}
                  plot={media.plot}
                  poster={media.poster}
                  year={media.year}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      <section className="fractured-section trending-section">
        <h2>Trending Content</h2>
        <div className="movie-grid">
          {medias.map((media) => (
            <div key={media.id} className="movie-card">
              <NavLink to={`/media/${media.id}`} className="nav-link">
                <MovieCard
                  title={media.title}
                  plot={media.plot}
                  poster={media.poster}
                  year={media.year}
                />
              </NavLink>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CIT GROUP 04. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
