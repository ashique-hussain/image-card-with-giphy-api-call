import React from "react";

const Card = (props) => {
  const { imgUrl, imgTitle, key, id, handleOnClick } = props;
  return (
    <div className="card" key={key}>
      <img
        src={imgUrl}
        alt={imgTitle}
        className="card-image"
        title={imgTitle}
        id={id}
        onClick={() => handleOnClick(imgUrl, imgTitle)}
      />
    </div>
  );
};

export default Card;
