import React, { useEffect, useState } from "react";
import DarkLightMod from "../Icons/Dark-Light-Mod";
import Mylogo from "../../assets/sonelgaz_white.png"
import { useNavigate } from "react-router-dom";

function Navbare() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(()=>{
    localStorage.setItem("theme", theme);
    const Localtheme=localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", Localtheme);
  },[theme])

  // this is navigate for the path:
  const navigate = useNavigate();

  return (
    <div className="navbar bg-primary   px-20 py-3 shadow-lg " >
      <div className="flex-1">
        <div  >
          <img src={Mylogo} alt="Logo" width="60px" height="30px"  onClick={()=>
          navigate('/')
        
        } style={{
          cursor: 'pointer'
        }} />
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 " >
          <li>
          <button className="btn btn-secondary mx-3"
           onClick={()=>{
            navigate('/login')
            
                      }}
          >Login</button>
          </li>
          <li>
          <button className="btn btn-secondary mx-3 "
          onClick={()=>{
navigate('/register')

          }}
          >Register</button>
          </li>
        
          
          <li>
            <details>
              <summary>Languge</summary>
              <ul className="p-2 bg-black rounded-t-none ">
                <li>
                  <a>English </a>
                </li>
                <li>
                  <a>Arabic  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbare;
