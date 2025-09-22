import Navbar from "../Navbar/Navbar";
import video from "../../assets/watch.mp4";
import "./Home.css";
import assets from "../../assets/assets";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

export default function Home() {
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
          <div className="recommend-card">
            <img src={assets.MTPV002D7B3} alt="watch" />
            <p className="brand">Casio</p>
            <h3 className="ref-num">MTP-V002D-7B3</h3>
            <p className="price">₱ 2,240</p>
          </div>
          <div className="recommend-card">
            <img src={assets.MTPV002D7B3} alt="watch" />
            <p className="brand">Casio</p>
            <h3 className="ref-num">MTP-V002D-7B3</h3>
            <p className="price">₱ 2,240</p>
          </div>
          <div className="recommend-card">
            <img src={assets.MTPV002D7B3} alt="watch" />
            <p className="brand">Casio</p>
            <h3 className="ref-num">MTP-V002D-7B3</h3>
            <p className="price">₱ 2,240</p>
          </div>
          <div className="recommend-card">
            <img src={assets.MTPV002D7B3} alt="watch" />
            <p className="brand">Casio</p>
            <h3 className="ref-num">MTP-V002D-7B3</h3>
            <p className="price">₱ 2,240</p>
          </div>
          <div className="recommend-card">
            <img src={assets.MTPV002D7B3} alt="watch" />
            <p className="brand">Casio</p>
            <h3 className="ref-num">MTP-V002D-7B3</h3>
            <p className="price">₱ 2,240</p>
          </div>
          <div className="recommend-card">
            <img src={assets.MTPV002D7B3} alt="watch" />
            <p className="brand">Casio</p>
            <h3 className="ref-num">MTP-V002D-7B3</h3>
            <p className="price">₱ 2,240</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
