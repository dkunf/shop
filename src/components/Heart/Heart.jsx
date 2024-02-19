import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./heart.scss";

function Heart({ title, src, description }) {
  const { toggleFav, fav } = useContext(AppContext);

  const isAlreadyInFav = fav.map((el) => el.title).includes(title);

  console.log("Heart");
  return (
    <div
      onClick={() => {
        toggleFav({ src, title, description });
      }}
      className={`heart ${isAlreadyInFav ? "red" : "grey"}`}
    >
      <FontAwesomeIcon icon={faHeart} />
    </div>
  );
}
// &#x2661; empty heart
export default Heart;
