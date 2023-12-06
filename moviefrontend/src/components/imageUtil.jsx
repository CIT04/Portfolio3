// imageUtils.js

export const renderImage = (poster, title) => {
    if (poster && poster !== "N/A") {
      return <img src={poster} alt={title} />;
    } else {
      return <img src={process.env.PUBLIC_URL + '/noimage.jpg'} alt="No Image" />;
    }
  };

  