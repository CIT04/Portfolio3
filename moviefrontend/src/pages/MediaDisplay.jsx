import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import '../components/css/MovieCard.css';
import MediaCards from "../components/MediaCards";
import Stack from 'react-bootstrap/Stack';
import MovieCard from "../components/MovieCard";
import './css/MediaDisplay.css';
import { Button } from "react-bootstrap";

const MediaDisplay = ({mediaId}) => {
const [count, setCount] = useState(5);  // Load this many users
const [media, setMedia] = useState([]); 
const [status, setStatus] = useState([]); 

useEffect(() => {
    console.log("aaaaaaaaaaaaaaaaaaa"+mediaId);
 
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/media/"+mediaId);
        const json = await response.json();
        setMedia(json);
        setStatus('done');
      } catch (error) {
        console.error("Error fetching data:", error);
        setStatus('error');
      }
    };
  
    fetchData();
  

  }, [count]);
  
    
  return (

    //First line
    <div>
    <div style={{ display: 'flex' }}>
    <Stack direction="horizontal" gap={3}>
      <div className="p-2">Type: i stykker{media.type}</div>
      <div className="p-2">Duration: {media.runtime} min.</div>
      <div className="p-2">{media.rated}</div>
    </Stack>

    <Stack direction="horizontal" gap={3}>
    <div className="p-2">IMDB:{media.average} TODO: stjæl fra mau </div>
    <Button>Edit Rating</Button>
    <div className="p-2">Rating:{media.rating}</div>
    <Button>Edit bookmark</Button>
    </Stack>
    </div>

    <div>
    <Stack direction="horizontal" gap={3}>
        <MovieCard poster={media.poster}/>
            <Stack gap={3}>
                <div className="p-2"><h1>{media.title}</h1>
                {/*TODO add originaltitle*/ }
                <h8>Original title: {media.title}</h8>
                </div>
                    <Stack direction="horizontal" gap={3}>
                        {/*TODO add directors and top 5 actors*/ }
                        <div className="p-2">
                            <p>Creators: ()</p>
                            <p>Stars: </p>
                        </div>
                        <div className="p-2">{media.plot} </div>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                                            <div className="p-2"><p>Languages:{media.language}</p>
                                            <p>Country of origin:{media.country}</p>
                                            </div>
                                            <div className="p-2">
                                                <h3>Genres</h3>
                                                <h4>
                                                    {/* Wait for media to be loaded before accesing media.mediaGenres  */}
                                                    {
                                                    status != 'done' ? 
                                                            <p>Loading</p>
                                                    :
                                                    
                                                    media.mediaGenres.map((genre, index) => (
                                                    <p key={index}>{genre}</p>
                                                    ))
                                                    }
                                                    
                                                
                                                    
                                                    
                                                </h4>
                                                
                                            </div>
                                            
                     
                    </Stack>
                
            </Stack>
    </Stack>
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