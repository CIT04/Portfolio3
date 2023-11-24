// MediaRow.jsx
import React from 'react';
import Media from './Media';

const MediaRow = ({ mediaList }) => {
  return (
    <div className="row">
      {mediaList.map((media, index) => (
        <div key={index} className="col-md-4 mb-3">
          <Media title={mediaList.title}/>
        </div>
      ))}
    </div>
  );
};

export default MediaRow;