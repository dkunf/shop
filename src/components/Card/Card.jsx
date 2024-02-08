import React from "react";
import "./card.scss";

export function Card(props) {
  console.log(props.src);
  //galima ir destructure
  //  function Card({title,description}){} ir naudoti jau tiesiog title ir description

  return (
    <div className="card">
      {/* <div className="img-container"></div> */}

      <h3>{props.title}</h3>
      <img src={props.src} alt={props.src} />
      <p>{props.description}</p>
      <button>Add To Cart</button>
    </div>
  );
}
