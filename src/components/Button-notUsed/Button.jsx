import React from "react";

function Button({ title, src, description, setCartData, isInsideCart }) {
  return (
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
  );
}

export default Button;
