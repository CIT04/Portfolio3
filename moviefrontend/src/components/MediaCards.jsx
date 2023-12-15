import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

//this entire file just contains the bootstrap and jsx elements to show the different elements on
//the media page

const TitleCard = ({ title, runtime, rated }) => (
  <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>Duration: {runtime}</Card.Text>
      <Card.Text>Rated: {rated}</Card.Text>
    </Card.Body>
  </Card>
);

const RatingCard = ({ rating, average }) => (
  <Card>
    <Card.Body>
      <Card.Title>Rating</Card.Title>
      <Card.Text>Rating: {rating}</Card.Text>
      <Card.Text>Average: {average}</Card.Text>
    </Card.Body>
  </Card>
);

const PosterCard = ({ poster }) => (
  <Card>
    <Card.Img variant="top" src={poster} />
  </Card>
);

const DetailsCard = ({ title, originalTitle, released }) => (
  <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>Original Title: {originalTitle}</Card.Text>
      <Card.Text>Released: {released}</Card.Text>
    </Card.Body>
  </Card>
);

const EmptyCard = () => (
  <Card>
    {/* Leave this card empty */}
  </Card>
);

const PlotCard = ({ plot }) => (
  <Card>
    <Card.Body>
      <Card.Title>Plot</Card.Title>
      <Card.Text>{plot}</Card.Text>
    </Card.Body>
  </Card>
);

const LanguageCountryCard = ({ lang, country }) => (
  <Card>
    <Card.Body>
      <Card.Title>Language & Country</Card.Title>
      <Card.Text>Language: {lang}</Card.Text>
      <Card.Text>Country: {country}</Card.Text>
    </Card.Body>
  </Card>
);

const GenreCard = ({ genre }) => (
  <Card>
    <Card.Body>
      <Card.Title>Genre</Card.Title>
      <Card.Text>{genre}</Card.Text>
    </Card.Body>
  </Card>
);

const TeamCard = ({ team }) => (
  <Card>
    <Card.Body>
      <Card.Title>
        <Link to={`/team/${team.mediaId}`}>
        <Card.Title>Team</Card.Title>
        </Link>
      </Card.Title>
      <Card.Text>{team.actor.map(actor => actor.person.name).join(", ")}</Card.Text>
    </Card.Body>
  </Card>
);



const MediaCards = ({
  title,
  runtime,
  rated,
  rating,
  average,
  poster,
  originalTitle,
  released,
  plot,
  lang,
  country,
  genre,

  
 
}) => (
  <div>
    <TitleCard title={title} runtime={runtime} rated={rated} />
    <RatingCard rating={rating} average={average} />
    <PosterCard poster={poster} />
    <DetailsCard title={title} originalTitle={originalTitle} released={released} />
    <EmptyCard />
    <PlotCard plot={plot} />
    <LanguageCountryCard lang={lang} country={country} />
    <GenreCard genre={genre} />
    <TeamCard team={team} />

  </div>
);

export default MediaCards;
