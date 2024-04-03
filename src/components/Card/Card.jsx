import React from "react";
import "./card.scss";
import Heart from "../Heart/Heart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export function Card({ title, src, description, clickAction, isInsideCart }) {
  console.log("Card");
  // export function Card(props) {
  console.log("src of card: ", src);
  //galima ir destructure
  //  function Card({title,description}){} ir naudoti jau tiesiog title ir description
  return (
    <div className="my-card">
      {/* <div className="img-container"></div> */}

      <h3>{title}</h3>
      <img src={src} alt={src} />
      <p>{description}</p>
      <Heart title={title} src={src} description={description}></Heart>
      <button
        onClick={() => {
          clickAction({
            title,
            src,
            description,
          });
        }}
      >
        {isInsideCart ? (
          "Remove From Cart"
        ) : (
          <FontAwesomeIcon icon={faCartPlus} className="addToCart" />
        )}
      </button>
    </div>
  );
}
