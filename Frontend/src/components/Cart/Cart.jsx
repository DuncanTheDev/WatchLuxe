import "./Cart.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import assets from "../../assets/assets";

export default function Cart() {
  return (
    <div className="cart">
      <Navbar />
      <div className="cart-container">
        <div className="bag-container">
          <div className="header">
            <h2>Bag</h2>
          </div>
          <div className="bag">
            <div className="left-side">
              <img src={assets.MTPV002D7B3} alt="" />
              <div className="quantity">
                <button className="quantity-button">-</button>
                <div>1</div>
                <button className="quantity-button">+</button>
              </div>
            </div>
            <div className="middle">
              <p className="cart-name">Casio</p>
              <p className="cart-ref_num">MTP-V002D-7B3</p>
            </div>
            <div className="right-side">
              <p className="cart-price">₱ 3000.00</p>
            </div>
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
