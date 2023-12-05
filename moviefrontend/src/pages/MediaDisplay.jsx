import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "./css/MediaDisplay.css"; // Update the path based on your project structure
import { useParams } from 'react-router-dom';
import Team from "./Team";
import { NavLink } from 'react-router-dom';

const MediaDisplay = () => {
  const [media, setMedia] = useState({ status: 'loading', mediaGenres: [] });
  const [rating, setRating] = useState({ status: 'loading', mediaGenres: [] });
  const [actors, setActors] = useState([]);
  const { mediaId } = useParams();

  const [crew, setCrew] = useState([]);
  const [wandd, setWandd] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/media/"+mediaId)
      .then((res) => res.json())
      .then((json) => {
        setMedia({ status: 'done', ...json });
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
          console.log(json.actor)
          // setCrew(json.crew);
          // setWandd({json.writersAndDirectors});

      });
    },[]);

  

  return (
    <div className="movie-page-container">
      <div className="header-container">
        <MovieCard poster={media.poster} />
        <div className="title-container">
          <h1>{media.title}</h1>
          <h6>Original title: {media.title}</h6>
        </div>
      </div>

      <div className="details-container">
        <div className="info-container">
          <p>Type: {media.type}</p>
          <p>Duration: {media.runtime} min.</p>
          <p>{media.rated}</p>
        </div>

        <div className="info-container">
          <p>IMDB: {rating.imdbRatings}</p>
          <p className="rating-label">Rating:</p>
          <div className="star-rating-container">
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
          <p>Creators: ()</p>
          <p>Stars: {actors.map(actor => actor.person.name).join(', ')} </p>
          <NavLink to={`/media/team/${mediaId}`} className="nav-link">
          <button>
          See full crew
          </button>
          </NavLink>
        </div>
        <div className="plot-container">{media.plot}</div>
      </div>

      <div className="additional-container">
        <div className="info-container">
          <p>Languages: {media.language}</p>
          <p>Country of origin: {media.country}</p>
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