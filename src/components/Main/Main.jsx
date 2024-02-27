//we abandon this to learn class syntax
//now we call it MainClass.jsx
import React, { useContext, useState } from "react";
// import { mockData } from "../../mockData"; perkelem i App
import "./main.scss";
import { Card } from "../Card/Card";
import { handleSort } from "../../utils/sortUtils";
// import MeasureF from "../../utils/measureTiming";
import SortBtns from "../Sort/SortBtns";
import { AppContext } from "../../contexts/AppContext";

function Main() {
  const { data, setData, handleAddToCart } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  // console.log(mockData);
  // const [data, setData] = React.useState(mockData); -perkelem i App,nes norim paimta card isimti is Main kad jo nebegaletume add to cart, o ten yra func, kuri prideda i cart, o tada kartu galime ir isimti ten
  console.log("Main");

  const handleSortData = (dir) => {
    setData(handleSort(data, dir));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // const handleAddToCartPerf = (arg) => new MeasureF(handleAddToCart, arg);
  // console.log(handleAddToCartPerf.timing);
  return (
    <>
      <div className="filtrai">
        <SortBtns sorting={handleSortData} />
        <div className="input-container">
          <label htmlFor="search-input">Search</label>
          <input
            onChange={(e) => handleSearch(e)}
            type="text"
            id="search-input"
          />
        </div>
      </div>
      <main className="main-container">
        {!data?.length ? <h1>Nieko nėra...</h1> : null}

        {/* vow, react array -> eilutes */}
        {data
          .filter(({ title }) => title.includes(searchText))
          .map((el) => (
            <Card
              src={el.src || ""}
              key={el.title}
              title={el.title}
              description={el.description}
              clickAction={handleAddToCart}
            />
          ))}
        {/* Pasirodo react supranta masyva kaip atskiras eilutes!! 
        pvz gali paduoti {[<button>1</button>,<button>2</button>,<button>3</button>]}
        ir jis traktuos kaip
        <button>1</button>
        <button>2</button>
        <button>3</button>
        */}
      </main>
    </>
  );
}

export default Main;
