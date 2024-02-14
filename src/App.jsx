import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import { mockData } from "./mockData";

import Navbar from "./components/Navbar/Navbar";
import Toast from "./components/Toast/Toast";
import Main from "./components/Main/Main";
import MyCart from "./components/Cart/MyCart";
import Favorite from "./components/Favorite/Favorite";

function App() {
  // const [tab, setTab] = useState("all"); //all, cart, favorite - nebereikia nes turim Routes
  const [cartData, setCartData] = useState([]);
  const [data, setData] = useState(mockData);
  const [fav, setFav] = useState([]);
  const [toast, setToast] = useState("");

  const handleAddToCart = (item) => {
    let titles = cartData.map((el) => el.title);

    if (!titles.includes(item.title)) {
      //pridedam i cart
      setCartData([...cartData, item]);
      setToast(`${item.title} item is added to the Cart`);
      //istraukiam is main
      const filteredData = data.filter((el) => el.title !== item.title);
      setData(filteredData);
    } else {
      setToast(`${item.title} is already in your cart!`);
    }
    setTimeout(() => {
      setToast("");
    }, 1500);
  };

  const handleRemoveFromCart = (item) => {
    setData([...data, item]);
    setToast(`${item.title} item is removed from the Cart`);
    setTimeout(() => {
      setToast("");
    }, 1500);
    const filteredCartData = cartData.filter((el) => el.title !== item.title);
    setCartData(filteredCartData);
  };

  const handleRemoveEverything = () => {
    setData(mockData);
    setCartData([]);
    setToast(`Everything is removed from the Cart`);
    setTimeout(() => {
      setToast("");
    }, 1500);
  };

  const handleAddFav = (item) => {
    console.log(item);
    let titles = fav.map((el) => el.title);

    if (!titles.includes(item.title)) {
      setFav([...fav, item]);
      setToast(`Favorite ${item.title} added`);
    } else {
      setToast(`${item.title} is already in your favorites!`);
    }

    setTimeout(() => {
      setToast("");
    }, 1500);
  };
  return (
    <>
      <Navbar />
      {toast === "" ? null : <Toast txt={toast}></Toast>}
      <Routes>
        <Route
          path="/"
          element={
            <Main
              data={data}
              setData={setData}
              setCartData={handleAddToCart}
              handleAddFav={handleAddFav}
            />
          }
        />
        <Route
          path="/my-cart"
          element={
            <MyCart
              cartData={cartData}
              handleRemoveEverything={handleRemoveEverything}
              // setCartData={handleRemoveFromCart}
              handleRemoveItem={handleRemoveFromCart}
              setCartData={setCartData}
              handleAddFav={handleAddFav}
            />
          }
        />
        <Route
          path="/fav"
          element={<Favorite fav={fav} clickAction={handleAddToCart} />}
        />
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
