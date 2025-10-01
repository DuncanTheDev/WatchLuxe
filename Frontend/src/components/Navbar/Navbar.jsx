import "../Navbar/Navbar.css";
import assets from "../../assets/assets";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/signin");
  };

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
        <div className="cart-icon">
          <NavLink to="/cart">
            <img className="icon" src={assets.cart} alt="cart_icon" />
            {cartCount > 0 && <div className="dot">{cartCount}</div>}
          </NavLink>
        </div>

        {/* Account Icon with Dropdown */}
        <div className="account-wrapper">
          <p onClick={handleSignin}>Sign In</p>
        </div>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setOpenMenu(true)}>
          &#9776;
        </div>
      </div>
    </div>
  );
}
