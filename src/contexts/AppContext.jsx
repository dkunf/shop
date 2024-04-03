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
      const response = await fetch(
        `${cfg.API.HOST}/product/6604b5a6633ed9bf0720da37`
      );
      //now we get multipart data: which consists of json and image file binary data
      //separated by '--boundary'
      const bodyAsBuffer = await response.arrayBuffer();
      console.log("bodyAsBuffer", bodyAsBuffer);

      //array of each byte
      const body8 = new Uint8Array(bodyAsBuffer);
      console.log("body8", body8);

      function textToUint8Array(text) {
        const encoder = new TextEncoder();
        const utf8Bytes = encoder.encode(text);
        return new Uint8Array(utf8Bytes);
      }
      const boundaryIn8 = textToUint8Array("--boundary");
      console.log("textToUint8Array('--boundary')", boundaryIn8);

      function chunkUp8(cake8, boundary8) {
        let strCake = JSON.stringify(Array.from(cake8)).replace(/[\[\]]/g, "");
        let strBound = JSON.stringify(Array.from(boundary8)).replace(
          /[\[\]]/g,
          ""
        );

        console.log("strCake:::", strCake);
        console.log("strBound:::", strBound);

        const parts = strCake.split(strBound);

        // let ind = strCake.indexOf(strBound);
        // let partJson = strCake.slice(0, ind);
        // let partFile = strCake.slice(ind);

        console.log("parts", parts);

        return parts;
      }
      chunkUp8(body8, boundaryIn8);

      /*
//base64 is not easy, it adds bytes to the end to make total length divisible by 4 etc.
//i better use uint8Array to find boundaries :)

      //now each byte we encode to base64 string
      const base64String = btoa(String.fromCharCode.apply(null, body8));
      console.log("base64String", base64String);
      console.log("length is ", base64String.length);

      function tob64(txt) {
        return btoa(unescape(encodeURIComponent(txt)));
      }
      function base64ToUtf8(base64String) {
        // Decode base64 string into binary data
        const binaryString = atob(base64String);
        // Convert binary data into UTF-8 string
        const utf8String = decodeURIComponent(escape(binaryString));
        return utf8String;
      }

      // Encode the boundary string to Base64, so we can separate json and file in the body
      const boundaryBase64 = tob64("--boundarystring");
      console.log("boundaryBase64", boundaryBase64);
      console.log("octet to b64", tob64("octet"));
      console.log("'Content' to b64", tob64("Content"));

      const parts = base64String.split(boundaryBase64.replace(/=+$/, ""));
      console.log("parts:", parts);
*/
      let prods = null;
      let b64FileData = null;
      /*
      for (const part of parts) {
        const trimmedPart = part.trim();
        if (trimmedPart.startsWith(tob64("Content-Type: application/json"))) {
          //temp, so that filter wrks. This should handle many prods, now just 1 for testing
          prods = [JSON.parse(trimmedPart.split(tob64("\n"))[1])];
        } else if (
          trimmedPart.startsWith(
            tob64("Content-Type: application/octet-stream")
          )
        ) {
          // Extract binary data from the part using boundary string
          const boundaryIndex = trimmedPart.indexOf(tob64("\r\n"));

          if (boundaryIndex !== -1) {
            // Find the start of the binary data after the empty line (\n\n)
            const binaryStartIndex = boundaryIndex + 2;
            // Extract binary data from the part
            b64FileData = trimmedPart.substring(binaryStartIndex);
            // Process the binary data as needed
            // Here, you might save the binary data to a file or display it as an image
          }
        }
      }

      // console.log("response", response);
      // const prods = await response.json();
      // console.log("prods", prods);
      console.log("Received JSON data:", prods);
      console.log("Received file URL:", b64FileData);

      console.log(b64FileData);
      // Create a data URL from the Base64-encoded string
      const dataUrl = `data:image/png;base64,${b64FileData}`;

      const filteredData = prods.filter(
        (item) => !cartData.some((cartItem) => cartItem.title === item.title)
      );
      console.log("filteredData[0]", filteredData[0]);
      filteredData[0].src = dataUrl;
      console.log("filteredData[0]", filteredData[0]);
*/
      // setData(filteredData);
      setData([]);
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
        clearToast,
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
