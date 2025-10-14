import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Watches from "./components/Watches/Watches";
import Contact from "./components/Contact/Contact";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ThankYou from "./components/Thankyou/Thankyou";
import SignIn from "./components/SignIn/Signin";
import SignUp from "./components/SignUp/SignUp";
import MyAccount from "./components/MyAccount/MyAccount";
import Order from "./components/Order/Order";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Thankyou" element={<ThankYou />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </div>
  );
}
