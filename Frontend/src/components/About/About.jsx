import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./About.css";
import assets from "../../assets/assets";

export default function About() {
  return (
    <div className="about">
      <Navbar />
      <div className="about-section">
        <div className="first-section">
          <h2>Welcome to WatchLuxe</h2>
          <p>
            Your premier destination for stylish, reliable, and timeless
            timepieces that blend affordability with exceptional quality. We're
            passionate about watches that tell more than just time—they reflect
            your personality, lifestyle, and sense of adventure.
          </p>
        </div>
        <div className="second-section">
          <h2>Our Story</h2>
          <p>
            Founded by a team of watch enthusiasts with extensive experience in
            the horology industry, WatchLuxe was born from a simple vision: to
            make high-quality watches accessible to all. We started in a small
            garage, sourcing authentic pieces from trusted suppliers, and have
            grown into a thriving online store serving customers across the
            globe. What began as a hobby for collecting and trading watches
            evolved into a commitment to bring joy through the perfect wrist
            companion. At WatchLuxe, we're not just sellers—we're storytellers,
            helping you find the watch that resonates with your unique journey.
          </p>
        </div>
        <div className="third-section">
          <h2>The Brands we Love</h2>
          <p>
            We pride ourselves on offering a diverse selection of renowned
            brands that stand the test of time. Our inventory features authentic
            watches sourced directly from authorized distributors, backed by
            manufacturer warranties. No knockoffs—just genuine quality you can
            trust.
          </p>
          <div className="brands">
            <div class="brand-item">
              <img src={assets.casio} alt="Casio Logo" />
              <h3>Casio</h3>
              <p>
                Iconic for their rugged durability and innovative digital
                features, perfect for tech-savvy adventurers.
              </p>
            </div>
            <div class="brand-item">
              <img src={assets.seiko} alt="Seiko Logo" />
              <h3>Seiko</h3>
              <p>
                Masters of precision and craftsmanship, delivering elegant
                designs from classic divers to sophisticated dress watches.
              </p>
            </div>
            <div class="brand-item">
              <img src={assets.swatch} alt="Swatch Logo" />
              <h3>Swatch</h3>
              <p>
                Fun, colorful, and Swiss-made, ideal for adding a pop of
                personality to your everyday look.
              </p>
            </div>
            <div class="brand-item">
              <img src={assets.citizen} alt="Citizen Logo" />
              <h3>Citizen</h3>
              <p>
                Eco-friendly innovators with solar-powered technology, combining
                sustainability with sleek, modern aesthetics.
              </p>
            </div>
            <div class="brand-item">
              <img src={assets.fossil} alt="Fossil Logo" />
              <h3>Fossil</h3>
              <p>
                Vintage-inspired styles with a contemporary twist, blending
                fashion-forward designs and smartwatch capabilities.
              </p>
            </div>
            <div class="brand-item">
              <img src={assets.timex} alt="Timex Logo" />
              <h3>Timex</h3>
              <p>
                Timeless American heritage, known for affordable reliability and
                features like Indiglo illumination for any occasion.
              </p>
            </div>
          </div>
        </div>
        <div className="fourth-section">
          <h2>Our Commitment to You</h2>
          <p>
            At WatchLuxe, our expert team is always here to help with sizing,
            styling advice, or any questions you might have. We're dedicated to
            sustainable practices, partnering with brands that prioritize
            ethical manufacturing and eco-conscious materials.
          </p>
          <br />
          <p>
            Join thousands of satisfied customers who have discovered their next
            favorite watch with us. Explore our collection today and elevate
            your style with WatchLuxe—where luxury meets everyday elegance.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
