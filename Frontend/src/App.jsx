import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Watches from "./components/Watches/Watches";
import Contact from "./components/Contact/Contact";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/watches" element={<Watches />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
