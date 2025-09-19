import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import assets from "../../assets/assets";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get("/cart");

        console.log(response.data);

        // If backend returned a full cart object
        if (response.data && response.data.cartItems) {
          setCart(response.data.cartItems);
        } else {
          setCart([]); // fallback for empty cart
        }
      } catch (err) {
        console.error("Failed to fetch cart: ", err);
        setCart([]); // prevent undefined crash
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="cart">
      <Navbar />
      <div className="cart-container">
        <div className="bag-container">
          <div className="header">
            <h2>Bag</h2>
          </div>
          <div className="bag">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="bag-item">
                  <div className="left-side">
                    <img
                      src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                      alt={item.product.name}
                    />
                    <div className="quantity">
                      <button className="quantity-button">-</button>
                      <div>{item.quantity}</div>
                      <button className="quantity-button">+</button>
                    </div>
                  </div>
                  <div className="middle">
                    <p className="cart-name">{item.product.brand}</p>
                    <p className="cart-ref_num">{item.product.name}</p>
                  </div>
                  <div className="right-side">
                    <p className="cart-price">₱ {item.product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
        <div className="summary-container">
          <h2>Summary</h2>
          <div className="summary">
            <div className="subtotal">
              <div className="label">
                <p>Subtotal</p>
              </div>
              <div className="summary-price">
                <p>₱ 3000.00</p>
              </div>
            </div>
            <div className="shipping">
              <div className="label">
                <p>Subtotal</p>
              </div>
              <div className="summary-price">
                <p>₱ 0</p>
              </div>
            </div>
            <div className="tax">
              <div className="label">
                <p>Tax</p>
              </div>
              <div className="summary-price">
                <p>₱ 0</p>
              </div>
            </div>
          </div>

          <div className="summary">
            <div className="total-price">
              <div className="label">
                <p>Total Price</p>
              </div>
              <div className="summary-price">
                <p>₱ 3000.00</p>
              </div>
            </div>
          </div>
          <div className="checkout">
            <button className="btn-checkout">Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
