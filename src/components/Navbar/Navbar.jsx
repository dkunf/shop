import React from "react";
import "./navbar.scss";

function Navbar() {
  return (
    <nav className="nav-container">
      <h1>My Shop</h1>
      <ul>
        <li>All items</li>
        <li>favourites</li>
      </ul>
    </nav>
  );
}
export default Navbar;
