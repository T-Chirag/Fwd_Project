import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import websiteLogo from "/src/assets/Swapify-logo.png";
import Carousel from "./components/Carousel";
import Recommendations from "./components/Recomendations";
import Footer from "./components/Footer";

function App() {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.istockphoto.com/id/1303978937/photo/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-sneakers-lifestyle.webp?s=2048x2048&w=is&k=20&c=iDwkE046emMy4M5pz_fN_KpSotExIM2SNz7C1YbJ0IM=",
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://via.placeholder.com/1200x500/FF00FF/FFFFFF?text=Image+5",
  ];

  // Navbar visibility state
  const [showNavBar, setShowNavBar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > lastScrollY) {
            setShowNavBar(false); // Hide navbar on scroll down
          } else {
            setShowNavBar(true); // Show navbar on scroll up
          }
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-full w-screen bg-black text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-slate/50 backdrop-blur-3xl shadow-md transition-transform duration-300 ${
          showNavBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center px-5 py-2">
          {/* Logo Section */}
          <div className="flex items-center text-2xl font-bold absolute">
            <img className="h-12 mr-2" src={websiteLogo} alt="website-logo" />
            Swapify
          </div>
          {/* NavBar */}
          <div className="w-full max-w-xl mx-auto ">
            <NavBar />
          </div>
        </div>
      </header>

      {/* Carousel Section */}
      <section className="pt-20">
        <Carousel images={images} height="500px" />
      </section>

      {/* Recommendations Section */}
      <section className="py-10 px-4">
        <Recommendations />
      </section>

      {/* Footer */}
      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
