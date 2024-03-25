import React, { createContext, useState, useEffect } from "react";
import { cfg } from "../cfg/cfg";
// import { mockData } from "../mockData";
export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [data, setData] = useState(
    []
    // JSON.parse(localStorage.getItem("data")) || mockData
  );
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [fav, setFav] = useState(JSON.parse(localStorage.getItem("fav")) || []);
  const [toast, setToast] = useState({ txt: "", colorCode: "ok" }); //ok or warning
  const [nrInCart, setNrInCart] = useState(cartData.length);

  // useEffect(() => {
  //   addToStorage("data", data);
  //   addToStorage("cartData", cartData);
  // }, [data, cartData]);

  // useEffect(() => {
  //   addToStorage("fav", fav);
  // }, [fav]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      // const response = await fetch("http://localhost:3000/product");
      const response = await fetch(`${cfg.API.HOST}/product`);

      console.log("response", response);
      const prods = await response.json();
      console.log("prods", prods);

      const filteredData = prods.filter(
        (item) => !cartData.some((cartItem) => cartItem.title === item.title)
      );

      setData(filteredData);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const setDataToLocalStorage = () => {
      addToStorage("data", data);
      addToStorage("cartData", cartData);
      addToStorage("fav", fav);
    };
    // Call the function when the component is about to unload
    window.addEventListener("beforeunload", setDataToLocalStorage);
    return () => {
      // Cleanup: remove the event listener when component unmounts
      window.removeEventListener("beforeunload", setDataToLocalStorage);
    };
  });

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

  const toggleFav = (item) => {
    let titles = fav.map((el) => el.title);

    if (!titles.includes(item.title)) {
      setFav([...fav, item]);
      setToast({
        txt: `${item.title} was added to the favorites`,
        colorCode: "ok",
      });
    } else {
      const filteredFav = fav.filter((el) => el.title !== item.title);
      setFav(filteredFav);
      setToast({
        txt: `${item.title} was removed from the favorites`,
        colorCode: "ok",
      });
    }
    clearToast();
  };

  function addToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

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
        toggleFav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
