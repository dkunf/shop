import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { AppContext } from "../../contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import User from "../User/User";

function Navbar() {
  const { nrInCart } = useContext(AppContext);
  console.log("Navbar");

  return (
    <nav className="nav-container">
      <h1>My Shop</h1>
      <ul>
        <li>
          <NavLink to="/">All items</NavLink>
        </li>
        <li>
          <NavLink to="/my-cart">
            <FontAwesomeIcon icon={faBasketShopping} className="basket-icon" />
            <span className="my-badge">{nrInCart}</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/fav">Favorite</NavLink>
        </li>
        <User className="user-styles" />
      </ul>
    </nav>
  );
}
export default Navbar;
