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
  const [nrInCart, setNrInCart] = useState(0);
  const [data, setData] = useState(mockData);
  const [fav, setFav] = useState([]);
  const [toast, setToast] = useState({ txt: "", colorCode: "ok" }); //ok or warning

  const handleAddToCart = (item) => {
    let titles = cartData.map((el) => el.title);

    if (!titles.includes(item.title)) {
      //pridedam i cart
      setCartData([...cartData, item]);
      setToast({
        txt: `${item.title} item is added to the Cart`,
        colorCode: "ok",
      });
      setNrInCart(nrInCart + 1);
      //istraukiam is main
      const filteredData = data.filter((el) => el.title !== item.title);
      setData(filteredData);
    } else {
      setToast({
        txt: `${item.title} is already in your cart!`,
        colorCode: "warning",
      });
    }
    setTimeout(() => {
      setToast("");
    }, 1500);
  };

  const handleRemoveFromCart = (item) => {
    setData([...data, item]);
    setToast({
      txt: `${item.title} item is removed from the Cart`,
      colorCode: "ok",
    });
    setNrInCart(nrInCart - 1);
    setTimeout(() => {
      setToast("");
    }, 1500);
    const filteredCartData = cartData.filter((el) => el.title !== item.title);
    setCartData(filteredCartData);
  };

  const handleRemoveEverything = () => {
    setData(mockData);
    setCartData([]);
    setToast({ txt: `Everything is removed from the Cart`, colorCode: "ok" });
    setNrInCart(0);
    setTimeout(() => {
      setToast("");
    }, 1500);
  };

  const handleAddFav = (item) => {
    let titles = fav.map((el) => el.title);

    if (!titles.includes(item.title)) {
      setFav([...fav, item]);
      setToast({ txt: `${item.title} added to favorites`, colorCode: "ok" });
    } else {
      setToast({
        txt: `${item.title} is already in your favorites!`,
        colorCode: "warning",
      });
    }

    setTimeout(() => {
      setToast("");
    }, 1500);
  };
  return (
    <>
      <Navbar nrInCart={nrInCart} />
      {toast === "" ? null : (
        <Toast txt={toast.txt} colorCode={toast.colorCode}></Toast>
      )}
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
