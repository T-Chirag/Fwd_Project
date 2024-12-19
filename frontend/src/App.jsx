import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import websiteLogo from "/src/assets/Swapify-logo.png";

function App() {
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    document.title = "Swapify - Home";

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > lastScrollY) {
            setShowNavBar(false);
          } else {
            setShowNavBar(true);
          }
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="relative h-full w-screen bg-black text-white">
        <header
          className={`fixed top-0 left-0 w-full z-50 bg-slate/50 backdrop-blur-3xl shadow-md transition-transform duration-300 ${
            showNavBar ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center px-5 py-2">
            <div className="flex items-center text-2xl font-bold absolute">
              <img className="h-12 mr-2" src={websiteLogo} alt="website-logo" />
              Swapify
            </div>
            <div className="w-full max-w-xl mx-auto">
              <NavBar />
            </div>
          </div>
        </header>
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
