import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import BookmarkButton from '../components/BookmarkButton';
import "./css/MediaDisplay.css"; // Update the path based on your project structure
import { useParams } from 'react-router-dom';
import Team from "./Team";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button component from Bootstrap
import RatingComponent from "../components/RatingComponent";
import TextToSpeech from './TextToSpeech'; // Import TextToSpeech component
import Trailer from "../components/Trailer";

const MediaDisplay = () => {
  const [media, setMedia] = useState({ status: 'loading', mediaGenres: [] });
  const [rating, setRating] = useState({ status: 'loading', mediaGenres: [] });
  const [actors, setActors] = useState([]);
  const [mediaLanguages, setMediaLanguages] = useState([]);
  const [mediaCountries, setMediaCountry] = useState([]);
  const [crew, setCrew] = useState([]);
  const [wandd, setWandd] = useState([]);
  const { mediaId } = useParams();
  const { actorId } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [trailerVideo, setTrailerVideo] = useState(null);

  
const handleRatingChange = (selectedRating) => {
  setUserRating(selectedRating);
};

  useEffect(() => {
    fetch("http://localhost:5001/api/media/"+mediaId)
      .then((res) => res.json())
      .then((json) => {
        setMedia({status: 'done', ...json})
        setMediaLanguages(json.mediaLanguages)
        setMediaCountry(json.mediaCountries)
      });
  }, []);

  

  useEffect(() => {
    fetch("http://localhost:5001/api/rating/"+mediaId)
      .then((res) => res.json())
      .then((json) => {
        setRating({ status: 'done', ...json });
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/api/media/team/'+mediaId)
      .then((res) => res.json())
      .then((json) => {
        setActors(json.actor);
        setCrew(json.crew);
        setWandd(json.writersAndDirectors);
      });
  },[]);

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
        &uarr;
      </div>
    );
  };
 

  return (
    <div className="movie-page-container">
      <div className="header-container">
      
        <MovieCard poster={media.poster} />
        <div className="title-container">
          <div className="bookmark-button-container">
            <BookmarkButton  m_id={media.id}/>
          </div>
          <h1>{media.title}</h1>
          <h6><b>Original title:</b> {media.title}</h6>
        </div>
      </div>
     
      <Trailer movieTitle={media.title} />    
      

      <div className="details-container">
        <div className="info-container">
        <p><b>Type:</b> {media.type}</p>
          <p><b>Duration:</b> {media.runtime} min.</p>
          <p>Parental Guidance Rating: {media.rated}  </p>
        </div>

        <div className="info-container">
          <p><b>IMDB:</b> {rating.imdbRatings}</p>
          <p className="rating-label"><b>Rating:</b></p>
          <div className="star-rating-container">
            <div>
              <RatingComponent/>
            </div>
            <div className="star-rating">
              {Array.from({ length: 10 }, (_, index) => (
                <span
                  key={index}
                  className="star"
                  style={{
                    fontSize: '1.5em',
                    color:
                      index < rating.averageRating
                        ? 'gold'
                        : index - 0.5 === rating.averageRating
                        ? 'gold'
                        : 'gray',
                  }}
                >
                  {index < rating.averageRating
                    ? '\u2605'
                    : index - 0.5 === rating.averageRating
                    ? '\u00BD'
                    : '\u2606'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="description-container">
      <div className="creators-container">
  <p><b>Creators:</b> {wandd.map(writersAndDirectors => writersAndDirectors.person.name).join(', ')}</p>
  <p><b>Stars:</b> 
    <div className="stars-container">
      {actors.map(actor => (
        <NavLink to={`/actor/${actor.personId}`} className="nav-link" key={actor.personId}>
          <div className="actor-box">{actor.person.name}</div>
        </NavLink>
      ))}
    </div>
  </p>

  <NavLink to={`/media/team/${mediaId}`} className="nav-link">
    <Button
      variant="info"
      className="see-crew-button"
      style={{ maxWidth: "200px" }}
    >
      See Full Crew
    </Button>
  </NavLink>

  <TextToSpeech textToRead={media.plot} />
</div>
        <div className="plot-container">{media.plot}</div>
      </div>
          
      <div className="additional-container">
        <div className="info-container">
          <p><b>Languages:</b> {mediaLanguages.join(', ')}</p>
          
          <p><b>Country of origin:</b> {mediaCountries.join(', ')} </p> 
        </div>

        <div className="genres-container">
          <h3>Genres</h3>
          <div className="genres-list">
            {media.status !== 'done' ? (
              <p>Loading</p>
            ) : (
              media.mediaGenres.map((genre, index) => (
                <p key={index}>{genre}</p>
              ))
            )}
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDisplay;

/*
  <MediaCards
    title={media.title}
    runtime={media.runtime}
    rated={media.rated}
    rating={media.rating}
    average={media.average}
    poster={media.poster}
    originalTitle={media.originalTitle}
    released={media.released}
    plot={media.plot}
    lang={media.lang}
    country={media.country}
    genre={media.genre}
  />
*/