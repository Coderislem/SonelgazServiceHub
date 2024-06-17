import React from "react";
import MyBackground from "../../assets/Sonelgaz_de_la_ville_de_Batna.jpg";
import "./hero-style.css";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  return (
    <div
      className="  min-h-screen"
      id="hero"
      style={{ paddingTop: "155px", paddingLeft: "85px" }}
    >
      <div className="  text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            At our platform, we're dedicated to addressing your needs for gas
            and electricity services. Whether you're submitting a complaint or
            requesting a new service connection, we're here to assist you every
            step of the way..
          </p>
          <button className="btn btn-secondary" onClick={()=> navigate("/dashboard")}>Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
