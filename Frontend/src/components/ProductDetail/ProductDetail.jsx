import "./ProductDetail.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <button className="add-cart">Add to Bag</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
