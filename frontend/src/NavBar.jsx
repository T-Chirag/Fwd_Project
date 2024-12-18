import React, { useState, useEffect } from "react";
import "./NavBar.css";

function NavBar() {
  const [showNavBar, setShowNavBar] = useState(true); // state to control navbar visibility
  const menuItems = [
    { id: 1, label: "HOME", link: "#home" },
    { id: 2, label: "BOOKS", link: "#books" },
    { id: 3, label: "GADGETS", link: "#gadgets" },
    { id: 4, label: "SHOES", link: "#shoes" },
    { id: 5, label: "OTHERS", link: "#others" },
    { id: 6, label: "LOG IN", link: "#login" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavBar(false); // hide navbar when scrolling down
      } else {
        setShowNavBar(true); // show navbar when scrolling up
      }
      lastScrollY = window.scrollY; // update last scroll position
    };

    window.addEventListener("scroll", handleScroll); // attach scroll listener

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`text-white m-1 bg-black/30 backdrop-blur-lg rounded-full h-12 flex items-center justify-between px-3 shadow-md transition-transform duration-300 ${
        showNavBar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {menuItems.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className=" px-4 py-2 font-semibold text-white hover:bg-slate-900 hover:text-white hover:rounded-full rounded-full transition duration-300"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default NavBar;
