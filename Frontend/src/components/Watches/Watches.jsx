import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Watches.css";
import api from "../../api/axios";

export default function Watches() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // React Router search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Load initial state from URL
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.getAll("brand") || []
  );
  const [selectedGenders, setSelectedGenders] = useState(
    searchParams.getAll("gender") || []
  );
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || ""
  );

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Update URL when filters change
  const updateURL = (brands, genders, sort) => {
    const params = new URLSearchParams();

    brands.forEach((b) => params.append("brand", b));
    genders.forEach((g) => params.append("gender", g));
    if (sort) params.set("sort", sort);

    setSearchParams(params);
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products", {
        params: {
          brand: selectedBrands,
          gender: selectedGenders,
          sort: selectedSort,
        },
      });
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when filters change
  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, selectedGenders, selectedSort]);

  // Update filters
  const handleBrandChange = (brand) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    updateURL(updated, selectedGenders, selectedSort);
  };

  const handleGenderChange = (gender) => {
    const updated = selectedGenders.includes(gender)
      ? selectedGenders.filter((g) => g !== gender)
      : [...selectedGenders, gender];
    setSelectedGenders(updated);
    updateURL(selectedBrands, updated, selectedSort);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
    updateURL(selectedBrands, selectedGenders, sort);
  };

  // ---------- Filter UI ----------
  const filterUI = (
    <>
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
            onChange={() => handleSortChange(sort.id)}
          />
          <label htmlFor={sort.id}>{sort.label}</label>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <Navbar />
      <div className="watches-container">
        {/* Desktop Filter */}
        <div className="filter-container desktop-only">{filterUI}</div>

        {/* Products */}
        <div className="product-container">
          {/* Mobile Filter Button */}
          <button
            className="mobile-filter-btn mobile-only"
            onClick={() => setShowMobileFilter(true)}
          >
            Filter
          </button>

          {/* Mobile Filter Overlay */}
          <AnimatePresence>
            {showMobileFilter && (
              <motion.div
                className="mobile-filter-overlay"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
              >
                <div className="mobile-filter-header">
                  <h2>Filter</h2>
                  <button
                    className="close-btn"
                    onClick={() => setShowMobileFilter(false)}
                  >
                    ✖
                  </button>
                </div>
                <div className="mobile-filter-content">{filterUI}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product List */}
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
                  <Link
                    className="link"
                    to={`/products/${product.id}`}
                    key={product.id}
                  >
                    <motion.div
                      key={product.id}
                      className="product-card"
                      variants={{
                        hidden: { opacity: 0, y: 25 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35 },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: -15,
                        transition: { duration: 0.2 },
                      }}
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
                  </Link>
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
