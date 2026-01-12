import "./Checkout.css";
import assets from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, use } from "react";
import api from "../../api/axios";

export default function Checkout() {
  const navigate = useNavigate();
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [shipping, setShipping] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  });

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
  });

  const shippingOptions = [
    { id: "standard", name: "Standard Shipping", fee: 150 },
    { id: "priority", name: "Priority Shipping", fee: 250 },
    { id: "express", name: "Express Shipping", fee: 350 },
  ];

  const selectedOption = shippingOptions.find(
    (opt) => opt.id === selectedShipping
  );

  const location = useLocation();
  const { subtotal = 0, cart = [] } = location.state || {};
  const total = subtotal + (selectedOption?.fee || 0);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "shipping") {
      setShipping((prev) => ({ ...prev, [name]: value }));
    } else {
      setBilling((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    let missingFields = [];

    Object.entries(shipping).forEach(([key, value]) => {
      if (
        key !== "phone" && // skip optional
        !value.trim()
      ) {
        missingFields.push(key);
      }
    });

    // Only validate billing if the form is shown
    if (showBillingForm) {
      Object.entries(billing).forEach(([key, value]) => {
        if (
          key !== "phone" && // skip optional
          !value.trim()
        ) {
          missingFields.push(`billing.${key}`);
        }
      });
    }

    if (missingFields.length > 0) {
      setErrorMessage("Please fill out all required fields.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handlePlaceOrder = async () => {
    setSubmitted(true);
    if (!validateForm()) return;

    if (shipping.email) {
      localStorage.setItem("guest_email", shipping.email);
    }

    const payload = {
      shipping: shipping,
      billing_same: !showBillingForm,
      billing: showBillingForm ? billing : null,

      items: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: subtotal,
      shipping_fee: selectedOption?.fee || 0,
      total_price: total,
      guest_email: !isLoggedIn ? shipping.email : null,
      shipping_method: selectedShipping,
      payment_method: selectedPayment,
    };

    console.log("Payload to send:", payload);

    try {
      const endpoint = isLoggedIn ? "/order" : "/guest/order";
      const response = await api.post(endpoint, payload);
      const order = response.data.order;

      try {
        await api.delete("/cart");
        console.log("Cart cleared successfully");
      } catch (err) {
        console.error("Failed to clear cart: ", err);
      }

      if (selectedPayment === "paypal") {
        const paypalResponse = await api.post("/paypal/create", {
          order_id: order.id,
          total_price: order.total_price,
        });

        const links = paypalResponse.data?.links;

        if (!links) {
          console.error("PayPal response missing links:", paypalResponse.data);
          setErrorMessage(
            "Something went wrong with PayPal. Please try again."
          );
          return;
        }

        const approveLink = links.find((link) => link.rel === "approve");

        if (!approveLink) {
          console.error("No approve link found in PayPal response:", links);
          setErrorMessage("PayPal did not return an approval link.");
          return;
        }

        window.location.href = approveLink.href;
      } else {
        navigate("/thankyou");
      }
    } catch (err) {
      console.error("Order failed: ", err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");

    if (error === "payment_failed") {
      alert("Payment unsuccessful. Please try again.");
    }
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      api.get("/user").then((res) => {
        const user = res.data;
        setShipping((prev) => ({
          ...prev,
          email: user.email || "",
          first_name: user.first_name || "",
          last_name: user.last_name || "",
        }));
      });
    }
  }, []);

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
            <input
              className={submitted && !shipping.email ? "error" : ""}
              type="email"
              name="email"
              value={shipping.email}
              onChange={(e) => handleChange(e, "shipping")}
              placeholder="Email"
              readOnly={isLoggedIn}
            />

            <input
              type="text"
              name="phone"
              value={shipping.phone}
              onChange={(e) => handleChange(e, "shipping")}
              placeholder="Phone (optional)"
            />
          </div>

          {/* Delivery */}
          <h2>Delivery</h2>
          <div className="form-group">
            <div className="input-row">
              <input
                className={submitted && !shipping.first_name ? "error" : ""}
                type="text"
                name="first_name"
                value={shipping.first_name}
                onChange={(e) => handleChange(e, "shipping")}
                placeholder="First name"
                readOnly={isLoggedIn}
              />
              <input
                className={submitted && !shipping.last_name ? "error" : ""}
                type="text"
                name="last_name"
                value={shipping.last_name}
                onChange={(e) => handleChange(e, "shipping")}
                placeholder="Last name"
                readOnly={isLoggedIn}
              />
            </div>
            <input
              className={submitted && !shipping.address ? "error" : ""}
              type="text"
              name="address"
              value={shipping.address}
              onChange={(e) => handleChange(e, "shipping")}
              placeholder="Address"
            />
            <div className="input-row">
              <input
                className={submitted && !shipping.postal_code ? "error" : ""}
                type="text"
                name="postal_code"
                value={shipping.postal_code}
                onChange={(e) => handleChange(e, "shipping")}
                placeholder="Postal code"
              />
              <input
                className={submitted && !shipping.city ? "error" : ""}
                type="text"
                name="city"
                value={shipping.city}
                onChange={(e) => handleChange(e, "shipping")}
                placeholder="City"
              />
            </div>
            <input
              className={submitted && !shipping.state ? "error" : ""}
              type="text"
              name="state"
              value={shipping.state}
              onChange={(e) => handleChange(e, "shipping")}
              placeholder="State"
            />
            <input
              className={submitted && !shipping.country ? "error" : ""}
              type="text"
              name="country"
              value={shipping.country}
              onChange={(e) => handleChange(e, "shipping")}
              placeholder="Country"
            />
          </div>

          {/* Billing */}
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
                  <input
                    className={submitted && !billing.first_name ? "error" : ""}
                    type="text"
                    name="first_name"
                    value={billing.first_name}
                    onChange={(e) => handleChange(e, "billing")}
                    placeholder="First name"
                  />
                  <input
                    className={submitted && !billing.last_name ? "error" : ""}
                    type="text"
                    name="last_name"
                    value={billing.last_name}
                    onChange={(e) => handleChange(e, "billing")}
                    placeholder="Last name"
                  />
                </div>
                <input
                  className={submitted && !billing.address ? "error" : ""}
                  type="text"
                  name="address"
                  value={billing.address}
                  onChange={(e) => handleChange(e, "billing")}
                  placeholder="Address"
                />
                <div className="input-row">
                  <input
                    className={submitted && !billing.postal_code ? "error" : ""}
                    type="text"
                    name="postal_code"
                    value={billing.postal_code}
                    onChange={(e) => handleChange(e, "billing")}
                    placeholder="Postal code"
                  />
                  <input
                    className={submitted && !billing.city ? "error" : ""}
                    type="text"
                    name="city"
                    value={billing.city}
                    onChange={(e) => handleChange(e, "billing")}
                    placeholder="City"
                  />
                </div>
                <input
                  className={submitted && !billing.state ? "error" : ""}
                  type="text"
                  name="state"
                  value={billing.state}
                  onChange={(e) => handleChange(e, "billing")}
                  placeholder="State"
                />
                <input
                  className={submitted && !billing.country ? "error" : ""}
                  type="text"
                  name="country"
                  value={billing.country}
                  onChange={(e) => handleChange(e, "billing")}
                  placeholder="Country"
                />
              </div>
            )}
          </div>

          {/* Shipping Method */}
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
              <p>₱ {option.fee}</p>
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
                <input
                  type="text"
                  placeholder="Card number"
                  maxLength={16}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                />
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length >= 2) {
                        val = val.substring(0, 2) + "/" + val.substring(2, 4);
                      }
                      e.target.value = val;
                    }}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength={3}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "");
                    }}
                  />
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

          {/* Error message */}
          {errorMessage && <div className="form-error">{errorMessage}</div>}

          {/* Place order */}
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>

        {/* Summary */}
        <div className="summary-container">
          <h2>Order Summary</h2>
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
              <p>₱ {selectedOption?.fee.toFixed(2)}</p>
            </div>
          </div>
          <hr />
          <div className="total-price">
            <div className="label">
              <p>Total</p>
            </div>
            <div className="summary-price">
              <p>₱ {total.toFixed(2)}</p>
            </div>
          </div>
          <hr />
          <div className="product-summary">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                    alt=""
                  />
                  <div className="summary-details">
                    <p>{item.product.name}</p>
                    <p>Qty {item.quantity}</p>
                    <p>₱ {item.product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in checkout</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
