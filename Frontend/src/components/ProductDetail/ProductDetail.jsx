import "./ProductDetail.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchCartCount, setCartCount } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Failed fetching product: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await api.post("/cart/add", {
        product_id: product.id,
        quantity: 1,
      });

      fetchCartCount();
      setCartCount((prev) => prev + 1);
      console.log(response.data);
    } catch (err) {
      console.error("Failed to add the product to bag: ", err);
    }
  };

  if (loading) {
    return (
      <div className="product-detail">
        <Navbar />
        <p className="loading">Loading product...</p>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <Navbar />
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Navbar />
      <div className="product-detail-container">
        <div className="product">
          <img
            src={`http://127.0.0.1:8000/storage/${product.image}`}
            alt={product.name}
          />
        </div>
        <div className="details">
          <p className="name">{product.name}</p>
          <p className="ref_num">{product.ref_num}</p>
          <p className="description">{product.description}</p>
          <p className="price">₱ {product.price}</p>
          <button
            className={`add-cart ${product.stock === 0 ? "out-of-stock" : ""}`}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
