import React from 'react'
import TopButton from './TopButton'
import { Link, useNavigate } from "react-router-dom";
function TitleAndButton() {
const navigate  = useNavigate();
  return (
   
   
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px'}}>
    <h1 style={{fontSize:'24px'}}>Section Manager</h1>
    <button className="btn " onClick={()=> navigate("/admindashboard/NewadminSubmanagment")}  >
                
               
              Add New  </button>
  </div>

  )
}

export default TitleAndButton
