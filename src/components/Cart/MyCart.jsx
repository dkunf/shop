import React from "react";
import { Card } from "../Card/Card";
import "./myCart.scss"; //destytojas padare bendra klase containeriui kad kiekvienas puslapis issidestytu panasiai, o as darau skirtingai nes noriu nepamirsti container css property
import SortBtns from "../Sort/SortBtns";
import { handleSort } from "../../utils/sortUtils";

function MyCart({
  cartData,
  setCartData,
  handleRemoveEverything,
  handleRemoveItem,
  handleAddFav,
}) {
  const sortCart = (dir) => {
    setCartData(handleSort(cartData, dir));
  };

  return (
    <>
      <div className="filtrai">
        <button onClick={handleRemoveEverything}>
          Remove everything from Cart
        </button>
        <SortBtns sorting={sortCart}></SortBtns>
      </div>

      <main className="cart-container">
        {!cartData?.length ? <h1>Nieko nėra...</h1> : null}
        {cartData.map(({ src, title, description }) => (
          <Card
            src={src || ""}
            key={title}
            title={title}
            description={description}
            clickAction={handleRemoveItem}
            isInsideCart={true}
            handleAddFav={handleAddFav}
          />
        ))}
      </main>
    </>
  );
}

export default MyCart;
