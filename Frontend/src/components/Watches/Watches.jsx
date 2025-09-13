import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Watches.css";
import api from "../../api/axios";

export default function Watches() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      selectedBrands.forEach((brand) => params.append("brand[]", brand));
      selectedGenders.forEach((gender) => params.append("gender[]", gender));
      if (selectedSort) params.append("sort", selectedSort);

      const response = await api.get(`/products?${params.toString()}`);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, selectedGenders, selectedSort]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleGenderChange = (gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  return (
    <div>
      <Navbar />
      <div className="watches-container">
        {/* ---------- Left Filters ---------- */}
        <div className="filter-container">
          <h3 className="filter-header">Brand</h3>
          {["Casio", "Seiko", "Fossil", "Timex", "Swatch", "Citizen"].map(
            (brand) => (
              <div className="filter-group" key={brand}>
                <input
                  type="checkbox"
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            )
          )}

          <h3 className="filter-header">Gender</h3>
          {["Men", "Women"].map((gender) => (
            <div className="filter-group" key={gender}>
              <input
                type="checkbox"
                id={gender}
                checked={selectedGenders.includes(gender)}
                onChange={() => handleGenderChange(gender)}
              />
              <label htmlFor={gender}>{gender}</label>
            </div>
          ))}

          <h3 className="filter-header">Sort</h3>
          {[
            { id: "newest", label: "Newest" },
            { id: "high-low", label: "Price: High-Low" },
            { id: "low-high", label: "Price: Low-High" },
          ].map((sort) => (
            <div className="filter-group" key={sort.id}>
              <input
                type="radio"
                name="sort"
                id={sort.id}
                checked={selectedSort === sort.id}
                onChange={() => setSelectedSort(sort.id)}
              />
              <label htmlFor={sort.id}>{sort.label}</label>
            </div>
          ))}
        </div>

        {/* ---------- Products Section ---------- */}
        <div className="product-container">
          {loading ? null : products.length > 0 ? (
            <motion.div
              className="products"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="product-card"
                    variants={{
                      hidden: { opacity: 0, y: 25 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                    }}
                    exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
                  >
                    <motion.img
                      src={`http://127.0.0.1:8000/storage/${product.image}`}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    />
                    <p className="brand">{product.brand?.name}</p>
                    <h3 className="ref-num">{product.ref_num}</h3>
                    <p className="price">₱ {product.price}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p className="no-products">No products found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
