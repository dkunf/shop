import React, { useContext } from "react";
import "./favorite.scss";
import { Card } from "../Card/Card";
import { AppContext } from "../../contexts/AppContext";

function Favorite() {
  console.log("Favorite");
  const { fav, handleAddToCart } = useContext(AppContext);
  return (
    <main className="main-container">
      {!fav?.length ? <h1>Nieko nėra...</h1> : null}

      {/* vow, react array -> eilutes */}
      {fav.map((el) => (
        <Card
          src={el.src || ""}
          key={el.title}
          title={el.title}
          description={el.description}
          clickAction={handleAddToCart}
        />
      ))}
      {/* Pasirodo react supranta masyva paduodama 
jam kaip atskiras eilutes!! */}
    </main>
  );
}

export default Favorite;
