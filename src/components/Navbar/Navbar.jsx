import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

function Navbar({ nrInCart }) {
  return (
    <nav className="nav-container">
      <h1>My Shop</h1>
      <ul>
        <li>
          <NavLink to="/">All items</NavLink>
        </li>
        <li>
          <NavLink to="/my-cart">
            My Cart: <span className="badge">{nrInCart}</span>{" "}
          </NavLink>
        </li>
        <li>
          <NavLink to="/fav">Favorite</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
