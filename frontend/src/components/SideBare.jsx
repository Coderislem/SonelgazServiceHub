import { useEffect,useState } from "react";
import Logo from "../assets/sonelgaz_white.png";
import { Link } from "react-router-dom";
function SideBare({arrayLinksFromsidebare}) {
 
        const arrayLinks=arrayLinksFromsidebare;
          
         
 
        return (
          <aside className="relative bg-blue-500 h-screen w-64 hidden sm:block shadow-xl">
            <div className="p-6">
              <a href="index.html" className="text-center">
                <img
                  style={{ width: "100px", height: "97px", marginLeft: "14px" }}
                  src={Logo}
                  alt="Logo"
                />
              </a>
            </div>
            <nav className="text-white text-base font-semibold pt-3">
            {
  arrayLinks.map((item) => (
    <Link
      key={item.id}
      to={item.href}
      className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item"
    >
      {item.icon} {/* Assuming you have 'icon' in your array of objects */}
      <span className="font-semibold center w-6/6 mx-4">{item.label}</span>
    </Link>
  ))
}
      
            </nav>
          </aside>
        );
      }
  


export default SideBare
