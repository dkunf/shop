import React, { createContext, useState } from "react";
import { mockData } from "../mockData";
export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [data, setData] = useState(mockData);
  const [cartData, setCartData] = useState([]);
  const [nrInCart, setNrInCart] = useState(0);
  const [fav, setFav] = useState([]);
  const [toast, setToast] = useState({ txt: "", colorCode: "ok" }); //ok or warning

  const handleAddToCart = (item) => {
    console.log("adding to cart");
    let titles = cartData?.map((el) => el.title);

    if (!titles.includes(item.title)) {
      //pridedam i cart
      setCartData([...cartData, item]);
      setToast({
        txt: `${item.title} item was added to the Cart`,
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
    clearToast();
  };

  const handleRemoveFromCart = (item) => {
    setData([...data, item]);
    setToast({
      txt: `${item.title} was removed from your Cart`,
      colorCode: "ok",
    });
    setNrInCart(nrInCart - 1);
    clearToast();
    const filteredCartData = cartData.filter((el) => el.title !== item.title);
    setCartData(filteredCartData);
  };

  const handleRemoveEverything = () => {
    setData([...data, ...cartData]);
    setCartData([]);
    setToast({ txt: `Everything was removed from your Cart`, colorCode: "ok" });
    setNrInCart(0);
    clearToast();
  };

  const handleAddFav = (item) => {
    let titles = fav.map((el) => el.title);

    if (!titles.includes(item.title)) {
      setFav([...fav, item]);
      setToast({
        txt: `${item.title} was added to the favorites`,
        colorCode: "ok",
      });
    } else {
      setToast({
        txt: `${item.title} is already in the favorites!`,
        colorCode: "warning",
      });
    }
    clearToast();
  };

  function clearToast() {
    setTimeout(() => {
      setToast("");
    }, 1500);
  }

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        cartData,
        setCartData,
        nrInCart,
        setNrInCart,
        fav,
        setFav,
        toast,
        setToast,
        handleAddToCart,
        handleRemoveFromCart,
        handleRemoveEverything,
        handleAddFav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
