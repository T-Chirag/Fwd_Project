import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="relative h-full w-screen bg-black text-white">
        <header className="fixed top-0 left-0 w-full z-50 bg-slate/50 backdrop-blur-3xl shadow-md">
          {/* Add NavBar here if needed */}
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
