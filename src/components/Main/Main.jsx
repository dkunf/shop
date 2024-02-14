//we abandon this to learn class syntax
//now we call it MainClass.jsx
import React from "react";
// import { mockData } from "../../mockData"; perkelem i App
import "./main.scss";
import { Card } from "../Card/Card";
import { handleSort } from "../../utils/sortUtils";
import SortBtns from "../Sort/SortBtns";

function Main({ setCartData, data, setData, handleAddFav }) {
  // console.log(mockData);
  // const [data, setData] = React.useState(mockData); -perkelem i App,nes norim paimta card isimti is Main kad jo nebegaletume add to cart, o ten yra func, kuri prideda i cart, o tada kartu galime ir isimti ten

  const handleSortData = (dir) => {
    setData(handleSort(data, dir));
  };

  return (
    <>
      <div className="filtrai">
        <SortBtns sorting={handleSortData} />
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
            clickAction={setCartData}
            handleAddFav={handleAddFav}
          />
        ))}
        {/* Pasirodo react supranta masyva paduodama 
      jam kaip atskiras eilutes!! */}
      </main>
    </>
  );
}

export default Main;
