

import React, { useState, useEffect } from "react";

const Trailer = ({ movieTitle }) => {
  const [trailerVideo, setTrailerVideo] = useState(null);



  useEffect(() => {
    const searchYouTube = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
            movieTitle + " trailer"
          )}&key=INSERT API KEY HERE (cannot put public api key when publishing on github)&part=snippet&type=video&videoEmbeddable=true&maxResults=1`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setTrailerVideo(data.items[0].id.videoId);
        }
      } catch (error) {
        console.error("Error searching YouTube:", error);
      }
    };

      if (movieTitle && !trailerVideo) {  // Add a check to avoid unnecessary API calls
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
