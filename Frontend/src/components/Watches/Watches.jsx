import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Watches.css";
import assets from "../../assets/assets";

export default function Watches() {
  return (
    <div>
      <Navbar />
      <div className="watches-container">
        <div className="filter-container">
          <div className="brand-filter">
            <h3 className="filter-header">Brand</h3>
            <div className="filter-group">
              <input type="checkbox" name="casio" id="casio" />
              <label htmlFor="casio">Casio</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="seiko" id="seiko" />
              <label htmlFor="seiko">Seiko</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="fossil" id="fossil" />
              <label htmlFor="fossil">Fossil</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="timex" id="timex" />
              <label htmlFor="timex">Timex</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="swatch" id="swatch" />
              <label htmlFor="swatch">Swatch</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="citizen" id="citizen" />
              <label htmlFor="citizen">Citizen</label>
            </div>
          </div>
          <div className="gender-filter">
            <h3 className="filter-header">Gender</h3>
            <div className="filter-group">
              <input type="checkbox" name="men" id="men" />
              <label htmlFor="men">Men</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="women" id="women" />
              <label htmlFor="women">Women</label>
            </div>
          </div>
          <div className="sort-filter">
            <h3 className="filter-header">Sort</h3>
            <div className="filter-group">
              <input type="checkbox" name="newest" id="newest" />
              <label htmlFor="newest">Newest</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="high-low" id="high-low" />
              <label htmlFor="high-low">Price: High-Low</label>
            </div>
            <div className="filter-group">
              <input type="checkbox" name="low-high" id="low-high" />
              <label htmlFor="low-high">Price: Low-High</label>
            </div>
          </div>
        </div>
        <div className="product-container">
          <div className="products">
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
            <div className="product-card">
              <img src={assets.MTPV002D7B3} alt="" />
              <p className="brand">Casio</p>
              <h3 className="ref-num">MTP-V002D-7B3</h3>
              <p className="price">₱ 2,240</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
