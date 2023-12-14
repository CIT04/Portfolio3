import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header.jsx';
import MovieCard from '../components/MovieCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/HomePage.css';
import ReactWordcloud from 'react-wordcloud';
import WordCloud from '../components/WordCloud.jsx'
import DataAccess from '../accessLayer/DataAccess';

function HomePage() {
  // Hardcoded mediaIds for each section
  const popularMediaIds  = ['tt6791350', 'tt10366206', 'tt6587046', 'tt9362722', 'tt24216002', 'tt0314331', 'tt1160419', 'tt9603212', 'tt6710474', 'tt13238346'];
  const seriesMediaIds   = ['tt2085059', 'tt0903747', 'tt0108778', 'tt2356777', 'tt0944947', 'tt7366338', 'tt5491994', 'tt0795176', 'tt0185906', 'tt0306414'];
  const topRatedMediaIds = ['tt11060882','tt0816692', 'tt0317248', 'tt9362722', 'tt6751668', 'tt0407887', 'tt0482571', 'tt1675434', 'tt4154756', 'tt2380307'];
  const trendingMediaIds = ['tt6741278', 'tt0944947', 'tt0314331', 'tt11198330', 'tt2356777', 'tt0108778', 'tt0386676', 'tt2442560', 'tt2085059', 'tt24216002'];

  const [popularMedias, setPopularMedias] = useState([]);
  const [seriesMedias, setSeriesMedias] = useState([]);
  const [topRatedMedias, setTopRatedMedias] = useState([]);
  const [trendingMedias, setTrendingMedias] = useState([]);

  
  const dataAccess = new DataAccess();

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
    const fetchMedias = async (mediaIds, setMedias) => {
      try {
        const mediaDetails = await Promise.all(
          mediaIds.map(async (mediaId) => {
            const mediaData = await dataAccess.fetchMediaDetails(mediaId);
            return mediaData; 
          })
        );
        setMedias(mediaDetails);
      } catch (error) {
        console.error('Error fetching media details', error);
      }
    };
  
    fetchMedias(popularMediaIds, setPopularMedias);
    fetchMedias(seriesMediaIds, setSeriesMedias);
    fetchMedias(topRatedMediaIds, setTopRatedMedias);
    fetchMedias(trendingMediaIds, setTrendingMedias);
  
  
  }, []); // Include any dependencies if needed
  return (
    <div className="app-container">
      <Header />
      <WordCloud />

      <section className="fractured-section popular-section">
        <h2>Popular Movies</h2>
        <div className="movie-grid">
          {popularMedias.map((media) => (
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
          {seriesMedias.map((media) => (
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
          {topRatedMedias.map((media) => (
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
          {trendingMedias.map((media) => (
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
