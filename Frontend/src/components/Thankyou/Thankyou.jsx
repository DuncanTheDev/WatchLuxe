import assets from "../../assets/assets";
import "./Thankyou.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Thankyou() {
  const navigate = useNavigate();
  const handleContinueShopping = () => {
    navigate("/watches");
  };

  const [product, setProduct] = useState([]);
  const [info, setInfo] = useState();

  const fetchOrder = async () => {
    try {
      const guestEmail = localStorage.getItem("guest_email");
      const token = localStorage.getItem("token");
      let url = "";
      if (token) {
        url = "/thankyou";
      } else if (guestEmail) {
        url = `/guest/thankyou?guest_email=${encodeURIComponent(guestEmail)}`;
      } else {
        return;
      }

      const response = await api.get(url);
      if (response.data.success) {
        setInfo(response.data.order);
        setProduct(response.data.order.order_items);
      }
    } catch (err) {
      console.error("Failed fetching product: ", err);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="Thankyou">
      <div className="thankyou-header">
        <img className="check" src={assets.check} alt="" />
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been confirmed and will be shipped soon.</p>
      </div>
      <div className="thankyou-content">
        <div className="order-summary">
          <h3 className="title">Order Summary</h3>
          <p className="order-date">
            Placed on {new Date(info?.created_at).toLocaleDateString()}
          </p>
          {product.map((item) => (
            <div key={item.id} className="order-items">
              <div className="item-img">
                <img
                  className="img"
                  src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                  alt=""
                />
              </div>
              <div className="item-details">
                <p>{item.product?.name}</p>
                <p>Qty: {item.product?.quantity}</p>
              </div>
              <div className="item-price">
                <p>{item.product?.price}</p>
              </div>
            </div>
          ))}
          <hr />
          <div className="price-details">
            <div className="price-group">
              <p>Subtotal</p>
              <p>{info?.subtotal}</p>
            </div>
            <div className="price-group">
              <p>Shipping</p>
              <p>{info?.shipping_fee}</p>
            </div>
          </div>
          <hr />
          <div className="total">
            <div className="price-group">
              <p>Total</p>
              <p>{info?.total_price}</p>
            </div>
          </div>
        </div>
        <div className="shipping-info">
          <h3 className="title">Shipping Information</h3>
          <div className="customer-name">
            <p>
              {info?.shipping_address?.first_name}{" "}
              {info?.shipping_address?.last_name}
            </p>
            <p>{info?.shipping_address?.address}</p>
            <p>
              {info?.shipping_address?.city}, {info?.shipping_address?.state}
            </p>
            <p>{info?.shipping_address?.postal_code}</p>
            <p>{info?.shipping_address?.country}</p>
          </div>
        </div>
      </div>
      <div className="continue-button">
        <button className="continue-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
