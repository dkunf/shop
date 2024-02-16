import React from "react";

function Heart({ title, handleAddFav, src, description }) {
  console.log("Heart");
  return (
    <div
      onClick={() => {
        handleAddFav({ src, title, description });
      }}
      className="heart"
    >
      &#10084;&#65039;
    </div>
  );
}

export default Heart;
