// imageUtils.js


//a simple way to check if poster is present in data or not, if not then show "noimage.jpg"
export const renderImage = (poster, title) => {
    if (poster && poster !== "N/A") {
      return <img src={poster} alt={title} />;
    } else {
      return <img src={process.env.PUBLIC_URL + '/noimage.jpg'} alt="No Image" />;
    }
  };

  