import Navbar from "../Navbar/Navbar";
import video from "../../assets/watch.mp4";
import "./Home.css";
import assets from "../../assets/assets";
import Footer from "../Footer/Footer";

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
          <div className="card">
            <img className="brand-logo" src={assets.casio} alt="" />
          </div>
          <div className="card">
            <img className="brand-logo" src={assets.seiko} alt="" />
          </div>
          <div className="card">
            <img className="brand-logo" src={assets.fossil} alt="" />
          </div>
          <div className="card">
            <img className="brand-logo" src={assets.timex} alt="" />
          </div>
          <div className="card">
            <img className="brand-logo" src={assets.swatch} alt="" />
          </div>
          <div className="card">
            <img className="brand-logo" src={assets.citizen} alt="" />
          </div>
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
      <Footer/>
    </div>
  );
}
