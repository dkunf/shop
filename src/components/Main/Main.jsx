//we abandon this to learn class syntax
//now we call it MainClass.jsx
import React from "react";
// import { mockData } from "../../mockData"; perkelem i App
import "./main.scss";
import { Card } from "../Card/Card";

function Main({ setCartData, data, setData }) {
  // console.log(mockData);
  // const [data, setData] = React.useState(mockData); -perkelem i App,nes norim paimta card isimti is Main kad jo nebegaletume add to cart, o ten yra func, kuri prideda i cart, o tada kartu galime ir isimti ten

  const handleSortData = (isAscending = 1) => {
    if (isAscending !== 1 && isAscending !== -1) {
      console.log("handleSortData accepts only numbers 1 or -1");
      isAscending = 1;
    }
    const sortedData = data.toSorted((a, b) => {
      if (a.title > b.title) return isAscending;
      if (a.title < b.title) return -1 * isAscending;
      return 0;
    });
    setData(sortedData);
  };

  return (
    <>
      <div className="filtrai">
        <button
          onClick={() => {
            handleSortData(1);
          }}
        >
          Sort A-Z
        </button>
        <button
          onClick={() => {
            handleSortData(-1);
          }}
        >
          Sort Z-A
        </button>
      </div>
      <main className="main-container">
        {!data?.length ? <h1>Nieko nėra...</h1> : null}

        {/* vow, react array -> eilutes */}
        {data.map((el) => (
          <Card
            src={el.src || ""}
            key={el.title}
            title={el.title}
            description={el.description}
            setCartData={setCartData}
          />
        ))}
        {/* Pasirodo react supranta masyva paduodama 
      jam kaip atskiras eilutes!! */}
      </main>
    </>
  );
}

export default Main;
