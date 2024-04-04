import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Toast from "./components/Toast/Toast";
import Main from "./components/Main/Main";
import MyCart from "./components/Cart/MyCart";
import Favorite from "./components/Favorite/Favorite";
import { AppContext } from "./contexts/AppContext";
import Admin from "./components/Admin/Admin";
import useAuth from "./hooks/useAuth";

function App() {
  const { toast } = useContext(AppContext);
  // const [tab, setTab] = useState("all"); //all, cart, favorite - nebereikia nes turim Routes
  console.log("App");
  const { token } = useAuth();
  return (
    <>
      <Navbar />
      {toast === "" ? null : (
        <Toast txt={toast.txt} colorCode={toast.colorCode}></Toast>
      )}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/my-cart" element={<MyCart />} />
          <Route path="/fav" element={<Favorite />} />
          {token && <Route path="/admin" element={<Admin />} />}
        </Routes>
      </div>

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
