import React from "react";

function SortBtns({ sorting }) {
  return (
    <>
      <button
        onClick={() => {
          sorting(1);
        }}
      >
        Sort A-Z
      </button>
      <button
        onClick={() => {
          sorting(-1);
        }}
      >
        Sort Z-A
      </button>
    </>
  );
}

export default SortBtns;
