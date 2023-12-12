import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header.jsx';
import MovieCard from '../components/MovieCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/HomePage.css';

function HomePage() {
  const [medias, setMedias] = useState([]);


  const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 200);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <div className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
        &uarr; <span style={{ fontSize: '0.8em' }}>Back to top</span>
      </div>
    );
  };

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
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
