// Trailer.jsx

import React, { useState, useEffect } from "react";

const Trailer = ({ movieTitle }) => {
  const [trailerVideo, setTrailerVideo] = useState(null);

  useEffect(() => {
    const searchYouTube = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
            movieTitle + " trailer"
          )}&key=AIzaSyCfYJ8UpE629UnvA4wxVMWCF4lpCVkIdrI&part=snippet&type=video&videoEmbeddable=true&maxResults=1`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setTrailerVideo(data.items[0].id.videoId);
        }
      } catch (error) {
        console.error("Error searching YouTube:", error);
      }
    };

    if (movieTitle) {
      searchYouTube();
    }
  }, [movieTitle]);

  return (
    <div className="trailer-container">
      <h3>Trailer</h3>
      <h3>(This is a WIP trailer feature)</h3>
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
        <p>No trailer found for {movieTitle}</p>
      )}
    </div>
  );
};

export default Trailer;
