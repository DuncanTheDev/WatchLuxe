import "../Navbar/Navbar.css";
import assets from "../../assets/assets";
import { useState } from "react";

export default function Navbar() {
  const [menu, setMenu] = useState("home");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="navbar">
      <h1 className="logo">WatchLuxe</h1>

      {/* Menu List */}
      <ul className={`menu-list ${openMenu ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setOpenMenu(false)}>
          &times;
        </div>
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("watches")}
          className={menu === "watches" ? "active" : ""}
        >
          Watches
        </li>
        <li
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          About
        </li>
        <li
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <img className="icon" src={assets.search} alt="search_icon" />
        <div className="cart-icon">
          <img className="icon" src={assets.cart} alt="cart_icon" />
          <div className="dot"></div>
        </div>
        <img className="icon" src={assets.account} alt="account_icon" />

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setOpenMenu(true)}>
          &#9776;
        </div>
      </div>
    </div>
  );
}
