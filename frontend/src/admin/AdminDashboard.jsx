import React from "react";
import AdminSideBare from "./AdminSideBare";
import TopButton from "./TopButton";
import ChefAjouns from "./allchefagouns/ChefAjouns";
import TitleAndButton from "./TitleAndButton";
import DefaultAvatar from '../assets/avatar.jpg'
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
function AdminDashboard() {
 
  return (
    <div className="flex justify-between">
      <AdminSideBare />
      <div className="flex-col w-full">
        <AdminHeader/>
       
        <div
          style={{
            border: "1px solid transport",
            borderRadius: "8px",
            backgroundColor: "white",
            
            margin:'40px'
          }}
        >
        
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
