// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import MovieCard from './MovieCard';

// function MovieCarousel({ medias }) {
//   const visibleItems = 5; // Set the number of visible items

//   // Function to chunk the array into sets of 'visibleItems'
//   const chunkArray = (arr, size) =>
//     Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//       arr.slice(i * size, i * size + size)
//     );

//   const mediaChunks = chunkArray(medias, visibleItems);

//   return (
//     <Carousel keyboard={false} pause={false}>
//       {mediaChunks.map((chunk, index) => (
//         <Carousel.Item key={index}>
//           <Row>
//             {chunk.map((media, mediaIndex) => (
//               <Col key={mediaIndex}>
//                 <MovieCard
//                   title={media.title}
//                   plot={media.plot}
//                   poster={media.poster}
//                   year={media.year}
//                 />
//               </Col>
//             ))}
//           </Row>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }

// export default MovieCarousel;
