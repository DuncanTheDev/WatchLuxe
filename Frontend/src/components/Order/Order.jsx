import Navbar from "../Navbar/Navbar";
import "./Order.css";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your orders.");
        return;
      }

      const response = await api.get("/orders");

      if (response.data.success && response.data.order.length > 0) {
        setOrders(response.data.order);
      } else {
        setError("No orders found.");
      }
    } catch (err) {
      console.error("Failed fetching orders:", err);
      setError("Something went wrong while fetching your orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) {
    return (
      <div className="order">
        <Navbar />
        <div className="order-container">
          <div className="order-header">
            <h2>Purchases</h2>
          </div>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order">
      <Navbar />
      <div className="order-container">
        <div className="order-header">
          <h2>Purchases</h2>
        </div>
        {orders.map((order) => (
          <div key={order.id}>
            {order.order_items.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  className="order-img"
                  src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                  alt=""
                />
                <div className="order-details">
                  <p className="order-id">Order ID#: {order.id}</p>
                  <p>{item.product.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>
                    Date Ordered:{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status">
                  <p>{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
        {/* {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p>
              Date Ordered: {new Date(order.created_at).toLocaleDateString()}
            </p>
            <p>Status: {order.status}</p>
            <hr />

            {order.order_items?.map((item) => (
              <div key={item.id} className="order-item">
                <img
                  src={`http://127.0.0.1:8000/storage/${item.product.image}`}
                  alt={item.product.name}
                />
                <div className="order-details">
                  <p>{item.product.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₱{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))} */}
      </div>
    </div>
  );
}
