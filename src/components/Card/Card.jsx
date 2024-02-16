import React from "react";
import "./card.scss";
import Heart from "../Heart/Heart";

export function Card({
  title,
  src,
  description,
  clickAction,
  isInsideCart,
  handleAddFav,
  isInsideFav,
}) {
  console.log("Card");
  // export function Card(props) {
  // console.log(props.src);
  //galima ir destructure
  //  function Card({title,description}){} ir naudoti jau tiesiog title ir description
  return (
    <div className="card">
      {/* <div className="img-container"></div> */}

      <h3>{title}</h3>
      <img src={src} alt={src} />
      <p>{description}</p>
      {isInsideFav ? null : (
        <Heart
          title={title}
          src={src}
          description={description}
          handleAddFav={handleAddFav}
        ></Heart>
      )}

      <button
        onClick={() => {
          clickAction({
            title,
            src,
            description,
          });
        }}
      >
        {isInsideCart ? "Remove From Cart" : "Add To Cart"}
      </button>
    </div>
  );
}
