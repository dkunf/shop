import React from "react";
import { Card } from "../Card/Card";
import "./myCart.scss"; //destytojas padare bendra klase containeriui kad kiekvienas puslapis issidestytu panasiai, o as darau skirtingai nes noriu nepamirsti container css property

function MyCart({ cartData, setCartData, handleRemoveEverything }) {
  return (
    <>
      <div className="filtrai">
        <button onClick={handleRemoveEverything}>
          Remove everything from Cart
        </button>
      </div>
      <main className="cart-container">
        {!cartData?.length ? <h1>Nieko nėra...</h1> : null}
        {cartData.map(({ src, title, description }) => (
          <Card
            src={src || ""}
            key={title}
            title={title}
            description={description}
            setCartData={setCartData}
            isInsideCart={true}
          />
        ))}
      </main>
    </>
  );
}

export default MyCart;
