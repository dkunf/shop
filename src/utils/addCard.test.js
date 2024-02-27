import React, { useContext } from "react";
import { render } from "@testing-library/react";
import AppContextProvider, { AppContext } from "../contexts/AppContext";
import App from "../App";

test("myFunction should do something", () => {
  // Define myFunction variable
  let handleAddToCart;
  let nrOfItems;

  // Define ChildComponent using useContext
  const ChildComponent = () => {
    // Access the context value using useContext
    const value = useContext(AppContext);

    // Set myFunction to the function from the context value
    React.useEffect(() => {
      handleAddToCart = value.handleAddToCart;
      nrOfItems = value.nrInCart;
    }, [value]);

    return null;
  };

  // Render MyContextProvider with ChildComponent
  render(
    <AppContextProvider>
      <App />
      <ChildComponent />
    </AppContextProvider>
  );

  // Now you can test myFunction
  // For example:
  expect(handleAddToCart).toBeDefined();
  // Perform other tests related to myFunction
  //what if we render Navbar and check after clicking if nrInCart increased?
  console.log("nrOfItems", nrOfItems);
  handleAddToCart();
  console.log("nrOfItems", nrOfItems);
});
// but this function does not return anything, so how to test?
// maybe we need tor ender components and see whats happening or better just see on real website?
