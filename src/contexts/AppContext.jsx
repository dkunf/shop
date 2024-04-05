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
    //so lets setup  all constants that i need - i'll turn it to class later
    const jsonMeta = {
      start: 0,
      end: 0,
      searchStringU8aBegin: "",
      searchStringU8aEnd: "",
    };
    const fileMeta = {
      start: 0,
      end: 0,
      searchStringU8aBegin: "",
      searchStringU8aEnd: "",
      extension: "",
    };

    //for now hardcoded, later would take it from headers...
    //checked how it goes with wireshark
    const boundaryBytesU8a = new TextEncoder().encode("--boundarystring\r\n");
    jsonMeta.searchStringU8aBegin = new TextEncoder().encode(
      "Content-Type: application/json\r\n\r\n"
    );
    fileMeta.searchStringU8aBegin = new TextEncoder().encode(
      "Content-Type: application/octet-stream\r\n"
    );
    jsonMeta.searchStringU8aEnd = new TextEncoder().encode(
      "\r\n--boundarystring"
    );
    fileMeta.searchStringU8aEnd = new TextEncoder().encode(
      "\r\n--boundarystring"
    );

    jsonMeta.start = findJsonStartIndex();
    jsonMeta.end = findJsonEndIndex();
    fileMeta.start = findFileStartIndex();
    fileMeta.end = findFileEndIndex();

    console.log("jsonMeta");
    console.log(jsonMeta);
    console.log("");
    console.log("fileMeta");
    console.log(fileMeta);

    //json starts immediately after "--boundarystring\r\n"+"Content-Type: application/json\r\n\r\n{" including {
    function findJsonStartIndex() {
      if (!jsonMeta?.searchStringU8aBegin || !body8) return -1;
      const searchString = [
        ...Array.from(boundaryBytesU8a),
        ...Array.from(jsonMeta.searchStringU8aBegin),
      ];
      const sBeginInd = findSubArrayFirstIndex(body8, searchString, 0);
      return sBeginInd === -1 ? -1 : sBeginInd + searchString.length;
    }

    //json finishes with "\r\n--boundarystring"
    //finds exact index, including the last }
    function findJsonEndIndex() {
      if (!jsonMeta?.searchStringU8aBegin || !body8) return -1;
      const searchString = Array.from(jsonMeta.searchStringU8aEnd);
      const sEndInd = findSubArrayFirstIndex(
        body8,
        searchString,
        jsonMeta.start
      );
      return sEndInd === -1 ? -1 : sEndInd - 1;
    }

    //file starts immediately after "--boundarystring\r\n"+"Content-Type: application/octet-stream\r\n"
    function findFileStartIndex() {
      if (!fileMeta?.searchStringU8aBegin || !body8) return -1;
      const searchString = [
        ...Array.from(boundaryBytesU8a),
        ...Array.from(fileMeta.searchStringU8aBegin),
      ];
      const sBeginInd = findSubArrayFirstIndex(body8, searchString, 0);
      return sBeginInd === -1 ? -1 : sBeginInd + searchString.length;
    }

    //file Ends with \r\n--boundarystring
    function findFileEndIndex() {
      if (!fileMeta?.searchStringU8aBegin || !body8) return -1;
      const searchString = Array.from(fileMeta.searchStringU8aEnd);
      const sEndInd = findSubArrayFirstIndex(
        body8,
        searchString,
        fileMeta.start
      );
      return sEndInd === -1 ? -1 : sEndInd - 1;
    }

    function findSubArrayFirstIndex(mainArray8, subArray8, startFrom) {
      if (startFrom === -1) return Infinity;
      const mainArray = Array.from(mainArray8);
      const subArray = Array.from(subArray8); //it's ok,makes copy
      for (let i = startFrom; i <= mainArray.length - subArray.length; i++) {
        let found = true;
        for (let j = 0; j < subArray.length; j++) {
          if (mainArray[i + j] !== subArray[j]) {
            found = false;
            break;
          }
        }
        if (found) {
          return i; // Return the index of the first occurrence of subArray in mainArray
        }
      }
      return -1; // Return -1 if subArray is not found in mainArray
    }

    function getJsonBytes() {
      return body8.subarray(jsonMeta.start, jsonMeta.end + 1);
    }
    function getFileBytes() {
      return body8.subarray(fileMeta.start, fileMeta.end + 1);
    }

    function getFileExtensionString(fileBin) {
      let extension = "";
      const extensionDictionary = {
        avif: [
          0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69,
          0x66, 0x00, 0x00, 0x00, 0x00,
        ],
        png: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
        // webp 0x52, 0x49, 0x46, 0x46, ?? ?? ?? ?? 0x57, 0x45, 0x42, 0x50	Google WebP image file, where ?? ?? ?? ?? is the file size.
        webp: [0x52, 0x49, 0x46, 0x46],
        jpg: [0xff, 0xd8, 0xff],
      };
      const chunk = Array.from(
        body8.subarray(fileMeta.start, fileMeta.start + 16)
      );

      const doesMatch = (arr, shorterArr) => {
        const len = shorterArr.length;
        let isMatching = true;
        for (let ch = 0; ch < len; ch++) {
          if (arr[ch] != shorterArr[ch]) {
            isMatching = false;
            break;
          }
        }
        return isMatching;
      };

      Object.keys(extensionDictionary).forEach((key) => {
        extension = doesMatch(chunk, extensionDictionary[key]) && `${key}`;
      });

      // extension =  isSame(chunk,extensionDictionary.avif) && ".avif"
      // extension =  isSame(chunk,extensionDictionary.png) && ".png"
      // extension =  isSame(chunk,extensionDictionary.webp) && ".webp"
      // extension =  isSame(chunk,extensionDictionary.jpg) && ".jpg"
      return extension;
    }

    //test all fn
    const fileBytes = getFileBytes();
    const fileType = getFileExtensionString(fileBytes);
    console.log("extension");
    console.log(fileType);

    //now we make blob out of binary file data with proper
    //type and then create URL to reference

    const fileBlob = new Blob([fileBytes], { type: `image/${fileType}` });
    const imgUrl = URL.createObjectURL(fileBlob);
    console.log("imgUrl:");
    console.log(imgUrl);
    //url works, vow!!!!

    // function chunkUp8(cake8, boundary8) {
    //   let strCake = JSON.stringify(Array.from(cake8)).replace(/[\[\]]/g, "");
    //   let strBound = JSON.stringify(Array.from(boundary8)).replace(
    //     /[\[\]]/g,
    //     ""
    //   );

    //   console.log("strCake:::", strCake);
    //   console.log("strBound:::", strBound);

    //   const parts = strCake.split(strBound);

    //   // let ind = strCake.indexOf(strBound);
    //   // let partJson = strCake.slice(0, ind);
    //   // let partFile = strCake.slice(ind);

    //   console.log("parts", parts);

    //   return parts;
    // }

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
    // let prods = null;
    // let b64FileData = null;
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
