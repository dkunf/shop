import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Toast from "./components/Toast/Toast";
import Main from "./components/Main/Main";
import MyCart from "./components/Cart/MyCart";
import Favorite from "./components/Favorite/Favorite";
import { AppContext } from "./contexts/AppContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import Login from "./components/Login/Login";

function App() {
  const { toast } = useContext(AppContext);
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  console.log("App");

  return (
    <>
      <Navbar />
      {toast === "" ? null : (
        <Toast txt={toast.txt} colorCode={toast.colorCode}></Toast>
      )}
      <Routes>
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/fav" element={<Favorite />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/" element={<Main />} />
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
