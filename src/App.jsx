import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import MyCart from "./components/Cart/MyCart";
import { mockData } from "./mockData";
import Favorite from "./components/Favorite/Favorite";

function App() {
  // const [tab, setTab] = useState("all"); //all, cart, favorite - nebereikia nes turim Routes
  const [cartData, setCartData] = useState([]);
  const [data, setData] = useState(mockData);

  const handleAddToCart = (item) => {
    //pridedam i cart
    setCartData([...cartData, item]);
    //istraukiam is main
    const filteredData = data.filter((el) => el.title !== item.title);
    setData(filteredData);
  };

  const handleRemoveFromCart = (item) => {
    setData([...data, item]);
    const filteredCartData = cartData.filter((el) => el.title !== item.title);
    setCartData(filteredCartData);
  };

  const handleRemoveEverything = () => {
    setData(mockData);
    setCartData([]);
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Main data={data} setData={setData} setCartData={handleAddToCart} />
          }
        />
        <Route
          path="/my-cart"
          element={
            <MyCart
              cartData={cartData}
              setCartData={handleRemoveFromCart}
              handleRemoveEverything={handleRemoveEverything}
            />
          }
        />
        <Route path="/fav" element={<Favorite />} />
      </Routes>

      {/* Situs pakeite Route */}
      {/* {tab === "all" && (
        <Main data={data} setData={setData} setCartData={handleAddToCart} />
      )} */}
      {/* {tab === "cart" && (
        <MyCart
          cartData={cartData}
          setCartData={handleRemoveFromCart}
          handleRemoveEverything={handleRemoveEverything}
        />
      )} */}
    </>
  );
}

export default App;
