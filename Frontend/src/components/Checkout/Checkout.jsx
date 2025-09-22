import "./Checkout.css";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const [showBillingForm, setShowBillingForm] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("card");

  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", fee: 150 },
    { id: "priority", name: "Priority Shipping", fee: 250 },
    { id: "express", name: "Express Shipping", fee: 350 },
  ];

  const selectedOption = shippingOptions.find(
    (opt) => opt.id === selectedShipping
  );

  const location = useLocation();
  const { subtotal = 0 } = location.state || {};
  const total = subtotal + (selectedOption?.fee || 0);

  return (
    <div>
      {/* Navbar */}
      <Link to="/" className="navbar">
        <h1 className="logo">WatchLuxe</h1>
      </Link>

      <div className="checkout-container">
        {/* Checkout Form */}
        <div className="checkout">
          {/* Contact */}
          <h2>Contact</h2>
          <div className="form-group">
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone" />
          </div>

          {/* Delivery */}
          <h2>Delivery</h2>
          <div className="form-group">
            <div className="input-row">
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Last name" />
            </div>
            <input type="text" placeholder="Address" />
            <div className="input-row">
              <input type="text" placeholder="Postal code" />
              <input type="text" placeholder="City" />
            </div>
            <input type="text" placeholder="Region" />
            <input type="text" placeholder="Country" />
          </div>

          <div className="billing-address">
            <label className="billing" htmlFor="">
              <input
                type="checkbox"
                checked={!showBillingForm}
                onChange={() => setShowBillingForm((prev) => !prev)}
              />
              Billing matches shipping address
            </label>
            {showBillingForm && (
              <div className="form-group">
                <div className="input-row">
                  <input type="text" placeholder="First name" />
                  <input type="text" placeholder="Last name" />
                </div>
                <input type="text" placeholder="Address" />
                <div className="input-row">
                  <input type="text" placeholder="Postal code" />
                  <input type="text" placeholder="City" />
                </div>
                <input type="text" placeholder="Region" />
                <input type="text" placeholder="Country" />
              </div>
            )}
          </div>

          {/* Shipping */}
          <h2>Shipping Method</h2>
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className={`shipping-group ${
                selectedShipping === option.id ? "active" : ""
              }`}
              onClick={() => setSelectedShipping(option.id)}
            >
              <p>{option.name}</p>
              <p>{option.fee}</p>
            </div>
          ))}

          {/* Payment */}
          <h2>Payment Method</h2>
          <div
            className={`payment-group ${
              selectedPayment === "card" ? "active" : ""
            }`}
            onClick={() => setSelectedPayment("card")}
          >
            <div className="card-group">
              <img src={assets.card} alt="" />
              <p>Credit or Debit card</p>
            </div>
            {selectedPayment === "card" && (
              <div className="payment-details">
                <input type="text" placeholder="Name on card" />
                <input type="text" placeholder="Card number" />
                <div className="input-row">
                  <input type="text" placeholder="MM/YY" />
                  <input type="text" placeholder="CVV" />
                </div>
              </div>
            )}
          </div>

          <div
            className={`payment-group ${
              selectedPayment === "paypal" ? "active" : ""
            }`}
            onClick={() => setSelectedPayment("paypal")}
          >
            <div className="card-group">
              <img src={assets.paypal} alt="" />
              <p>Paypal</p>
            </div>
          </div>

          {/* place order button */}
          <button>Place Order </button>
        </div>

        {/* Summary (Right Side) */}
        <div className="summary-container">
          <h2>Order Summary</h2>
          <div className="subtotal">
            <div className="label">
              <p>Subtotal </p>
            </div>
            <div className="summary-price">
              <p>₱ {subtotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="shipping">
            <div className="label">
              <p>Shipping </p>
            </div>
            <div className="summary-price">
              <p>₱ {selectedOption?.fee.toFixed(2)}</p>
            </div>
          </div>
          <hr />
          <div className="total-price">
            <div className="label">
              <p>Total </p>
            </div>
            <div className="summary-price">
              <p>₱ {total.toFixed(2)}</p>
            </div>
          </div>
          <hr />
          <div className="product-summary">
            <img src={assets.MTPV002D7B3} alt="" />
            <div className="summary-details">
              <p>Name</p>
              <p>Qty 1</p>
              <p>Price</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
