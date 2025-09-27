import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

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

  const handleIncreaseQuantity = async (item) => {
    try {
      const response = await api.put(`/cart/${item.id}`, {
        quantity: item.quantity + 1,
      });
      setCart((prev) =>
        prev.map((c) =>
          c.id === item.id
            ? { ...c, quantity: response.data.cartItems.quantity }
            : c
        )
      );
    } catch (err) {
      console.error("Failed to increase quantity: ", err);
    }
  };

  const handleDecreaseQuantity = async (item) => {
    if (item.quantity === 1) {
      try {
        await api.delete(`/cart/${item.id}`);
        setCart((prev) => prev.filter((c) => c.id !== item.id));
      } catch (err) {
        console.error("Failed to delete item: ", err);
      }
    } else {
      try {
        const response = await api.put(`/cart/${item.id}`, {
          quantity: item.quantity - 1,
        });

        setCart((prev) =>
          prev.map((c) =>
            c.id === item.id
              ? { ...c, quantity: response.data.cartItems.quantity }
              : c
          )
        );
      } catch (err) {
        console.error("Failed to decrease quantity: ", err);
      }
    }
  };

  const calculateTotal = () => {
    if (!cart || cart.length === 0) {
      return { subtotal: 0, shipping: 0, tax: 0, total: 0 };
    }

    const subtotal = cart.reduce(
      (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
      0
    );

    const shipping = 150;
    const total = subtotal + shipping;

    return { subtotal, shipping, total };
  };

  const { subtotal, shipping, total } = calculateTotal();

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
                      <button
                        className="quantity-button"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        -
                      </button>
                      <div>{item.quantity}</div>
                      <button
                        className="quantity-button"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="middle">
                    <p className="cart-name">{item.product.name}</p>
                    <p className="cart-ref_num">{item.product.ref_num}</p>
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
                <p>₱ {subtotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="shipping">
              <div className="label">
                <p>Shipping</p>
              </div>
              <div className="summary-price">
                <p>₱ {shipping.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="total-price">
            <div className="label">
              <p>Total Price</p>
            </div>
            <div className="summary-price">
              <p>₱ {total.toFixed(2)}</p>
            </div>
          </div>
          <hr />
          <div className="checkout-button">
            <Link
              className="btn-checkout"
              to="/checkout"
              state={{ subtotal, cart }}
            >
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
