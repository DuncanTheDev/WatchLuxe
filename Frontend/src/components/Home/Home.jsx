import Navbar from "../Navbar/Navbar";
import video from "../../assets/watch.mp4";
import "./Home.css";
import assets from "../../assets/assets";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Home() {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        const response = await api.get("/recommended");
        setRecommended(response.data);
      } catch (err) {
        console.error("Failed to fetch recommended watches: ", err);
      }
    };

    fetchRecommend();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="hero-video">
        <video src={video} autoPlay muted loop playsInline></video>
      </div>
      <div className="banner-message">
        <h1>Discover Timeless Elegance</h1>
        <p>
          Explore our curated collection of affordable, high-quality watches
          that combine style, durability, and precision. Perfectly crafted to
          complement every occasion and elevate your everyday look.
        </p>
      </div>
      <div className="card-container">
        <h1>Shop By Brand</h1>
        <div className="cards">
          <Link to="/watches?brand=Casio" className="card">
            <img className="brand-logo" src={assets.casio} alt="" />
          </Link>
          <Link to="watches?brand=Seiko" className="card">
            <img className="brand-logo" src={assets.seiko} alt="" />
          </Link>
          <Link to="watches?brand=Fossil" className="card">
            <img className="brand-logo" src={assets.fossil} alt="" />
          </Link>
          <Link to="watches?brand=Timex" className="card">
            <img className="brand-logo" src={assets.timex} alt="" />
          </Link>
          <Link to="watches?brand=Swatch" className="card">
            <img className="brand-logo" src={assets.swatch} alt="" />
          </Link>
          <Link to="watches?brand=Citizen" className="card">
            <img className="brand-logo" src={assets.citizen} alt="" />
          </Link>
        </div>
      </div>
      <div className="recommend">
        <h1>Recommended for You</h1>
        <div className="recommend-cards">
          {recommended.length > 0 ? (
            recommended.map((product) => (
              <div key={product.id} className="recommend-card">
                <div className="card-img">
                  <img
                    src={`http://127.0.0.1:8000/storage/${product.image}`}
                    alt=""
                  />
                </div>
                <p className="brand">{product.brand}</p>
                <h3 className="ref-num">{product.ref_num}</h3>
                <p className="price">₱ {product.price}</p>
              </div>
            ))
          ) : (
            <p>Loading recommend watches...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
