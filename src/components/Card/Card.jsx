import React from "react";
import "./card.scss";
export function Card({ title, src, description, setCartData, isInsideCart }) {
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
      <button
        onClick={() => {
          setCartData({
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
