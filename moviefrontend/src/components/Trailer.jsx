
import DataAccess from "../accessLayer/DataAccess";
import React, { useState, useEffect } from "react";

const Trailer = ({ movieTitle }) => {
  const [trailerVideo, setTrailerVideo] = useState(null);
  const dataAccess = new DataAccess;


  useEffect(() => {
    const searchYouTube = async () => {
      try {
        const videoId = await dataAccess.searchYouTubeTrailer(movieTitle);

        if (videoId) {
          setTrailerVideo(videoId);
        }
      } catch (error) {
        console.error("Error searching YouTube:", error);
      }
    };

    if (movieTitle && !trailerVideo) {
      searchYouTube();
    }
  }, [movieTitle, trailerVideo]);

  return (
    <div className="trailer-container">
      <h3>Trailer</h3>
      {trailerVideo ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerVideo}`}
          title="Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer found for {movieTitle} (Currently disabled due to API key being used up too fast, feel free to insert own api key in trailer.jsx.)
        </p>
      )}
    </div>
  );
};

export default Trailer;
