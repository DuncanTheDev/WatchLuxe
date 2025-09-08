import "../Navbar/Navbar.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false); // dropdown toggle

  return (
    <div className="navbar">
      <h1 className="logo">WatchLuxe</h1>

      {/* Menu List */}
      <ul className={`menu-list ${openMenu ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setOpenMenu(false)}>
          &times;
        </div>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => setOpenMenu(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watches"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => setOpenMenu(false)}
          >
            Watches
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => setOpenMenu(false)}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
            onClick={() => setOpenMenu(false)}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        <img className="icon" src={assets.search} alt="search_icon" />
        <div className="cart-icon">
          <img className="icon" src={assets.cart} alt="cart_icon" />
          <div className="dot"></div>
        </div>

        {/* Account Icon with Dropdown */}
        <div className="account-wrapper">
          <img
            className="icon"
            src={assets.account}
            alt="account_icon"
            onClick={() => setAccountOpen(!accountOpen)}
          />
          {accountOpen && (
            <div className="account-dropdown">
              <a href="/signin">Sign In</a>
              <a href="/signup">Sign Up</a>
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setOpenMenu(true)}>
          &#9776;
        </div>
      </div>
    </div>
  );
}
