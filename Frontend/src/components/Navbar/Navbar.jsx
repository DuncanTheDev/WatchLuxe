import "../Navbar/Navbar.css";
import assets from "../../assets/assets";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { cartCount, fetchCartCount, setCartCount } = useCart();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    try {
      await fetchCartCount();
    } catch (err) {
      console.error("Failed to fetch guest cart: ", error);
      setCartCount(0);
    }

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleMyAccount = () => {
    navigate("/my-account");
  };

  const handleOrderHistory = () => {
    navigate("/orders");
  };

  return (
    <div className="navbar">
      <h1 className="logo" onClick={() => navigate("/")}>WatchLuxe</h1>

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

        {/* Account Dropdown */}
        <div
          className="account-wrapper"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {isLoggedIn ? (
            <>
              <p className="account-text">Account</p>
              {showDropdown && (
                <div className="account-dropdown">
                  <p onClick={handleMyAccount}>My Account</p>
                  <p onClick={handleOrderHistory}>Order History</p>
                  <p onClick={handleLogout}>Logout</p>
                </div>
              )}
            </>
          ) : (
            <p onClick={handleSignin}>Sign In</p>
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
