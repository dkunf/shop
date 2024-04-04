import React, { createContext, useState, useEffect } from "react";
import { cfg } from "../cfg/cfg";
// import { mockData } from "../mockData";
export const AppContext = createContext();

function AppContextProvider({ children }) {
  const [loadingProducts, setLoadingProducts] = useState(true);
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
  const [showLogin, setShowLogin] = useState(false);

  // useEffect(() => {
  //   addToStorage("data", data);
  //   addToStorage("cartData", cartData);
  // }, [data, cartData]);

  // useEffect(() => {
  //   addToStorage("fav", fav);
  // }, [fav]);
  const fetchAllProducts = async () => {
    // const response = await fetch("http://localhost:3000/product");
    //for testing purposes!!!: first we learn to fetch one prod with pic

    const response = await fetch(
      `${cfg.API.HOST}/product/6604b5a6633ed9bf0720da37`
    );
    //now we get multipart data: which consists of json and image file binary data
    //separated by '--boundary' line
    const bodyAsBuffer = await response.arrayBuffer();
    console.log("bodyAsBuffer", bodyAsBuffer);

    //now i can choose how to view this buffer: uint8Array (each byte), uint16Array (2bytes)
    //this view points to the same memory location as arrayBuffer and lets manipulate data there easily
    //whatever i change on the view is changed in the arrayBuffer (raw binary data from memory)

    //so my plan is first to find where '--boundary' strings are(indexes)
    //in order to do that I need to view arrayBuffer as text and search boundary using js String methods
    //no, actually index in text may not correspond to index in arrayBuffer because 1 character of text
    //in utf-8 format may be 1-4bytes long, too bad.
    //So to be sure that we get correct boundary indices, we will convert boundary string to binary
    // and then search this binary sequence in the binary view like uint8Array of arrayBuffer
    //this way it is sure
    //after i get boundary indices i will need to check Content-Type string to see what
    //  goes after boundary: JSON or image data
    //after that i get indices of JSON data start and end
    //also indices of image data start and end and also file type: png,jpg,webp or avif (using magic nrs)
    //then i can have copy of buffer array for json chunk and for file chunk to handle them separately

    const body8 = new Uint8Array(bodyAsBuffer);
    //so lets setup  all constants that i need
    const jsonMeta = { start: 0, end: 0, searchString: "" };
    const fileMeta = { start: 0, end: 0, searchString: "", extension: "" };

    //for now hardcoded, later would take it from headers...
    //checked how it goes with wireshark
    const boundaryBytes = new TextEncoder().encode("--boundarystring\r\n");
    jsonMeta.searchString = new TextEncoder().encode(
      "Content-Type: application/json\r\n\r\n"
    );
    fileMeta.searchString = new TextEncoder().encode(
      "Content-Type: application/octet-stream\r\n"
    );

    //json starts immediately after "--boundarystring\r\n"+"Content-Type: application/json\r\n\r\n{" including {
    function findJsonStartIndex() {}

    //json finishes with }\r\n
    function findJsonEndIndex() {}

    //file starts immediately after "--boundarystring\r\n"+"Content-Type: application/octet-stream\r\n"
    function findFileStartIndex() {}

    //file Ends with \r\n--boundarystring
    function findFileEndIndex() {}

    function getJsonBytes() {}
    function getFileBytes() {}
    function getFileExtensionString() {}

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

  useEffect(() => {
    try {
      setLoadingProducts(true);
      fetchAllProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
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
        fetchAllProducts,
        loadingProducts,
        showLogin,
        setShowLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
