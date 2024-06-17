import React from "react";
import Navbare from "../components/Navbare/Navbare";
import Hero from "../components/Section/Hero";
import MyBackground from "../assets/Sonelgaz_de_la_ville_de_Batna.jpg";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AllDashboard from "../client/Dashboard/AllDashboard";
import Domande from "../client/Dashboard/Domande";
import Problem from "../client/Dashboard/Problem";
import About from "../client/Dashboard/About";
import LoginAdmin from "../admin/LoginAdmin";
import AdminDashboard from "../admin/AdminDashboard";
import LesDomonde from "../admin/LesDomonde";
import ChefAjouns from "../admin/allchefagouns/ChefAjouns";
import State from "../admin/State";
import ManageAccount from "../components/ManageAccount";
import NewReclamation from "../client/Dashboard/NewReclamation";
import HistoryDomonde from "../client/Dashboard/HistoryDomonde";
import CreateAjounse from "../components/CreateAjounse";
import ReclamationTable from "../components/ReclamationTable";
import NewChefAjouns from "../components/modales/NewChefAjouns";
import ChefAjounsDashBourad from "../components/ChefAjounsDashBourad";
import Mybackground from  "../assets/light-steel-blue-watercolor-background.jpg";
import ReportTable from "../admin/ReportTable";
import NotFound from "../components/NotFound";
import HistoryReclamation from "../client/HistoryReclamation"
function Layout() {
  const location = useLocation();

  // Check if the current path is "/dashboard"
  const isDashboard =
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/domande" ||
    location.pathname === "/dashboard/problem" ||
    location.pathname === "/dashboard/reclamation" ||
    location.pathname === "/dashboard/about" ||
    location.pathname === "/admin" ||
    location.pathname === "/adminlogin" ||
    location.pathname === "/admindashboard" ||
    location.pathname === "/admindashboard/chefajouns" ||
    location.pathname === "/admindashboard/lesdomonde" ||
    location.pathname === "/admindashboard/state" ||
    location.pathname === "/dashboard/newreclamation" ||
    location.pathname === "/dashboard/account" ||
    location.pathname === "/dashboard/historydomonde" ||
    location.pathname === "/admindashboard/NewAjouns" ||
    location.pathname === "/admindashboard/tableReclamation" ||
    location.pathname === "/admindashboard/NewadminSubmanagment" ||
    location.pathname === "/chefajounsdashboard/lesdomonde" ||
    location.pathname === "/chefajounsdashboard/tableReclamation" ||
    location.pathname === "/dashboard/historyreclamation" ||
    location.pathname === "/admindashboard/raporetype" ||
    location.pathname === "/chefajounsdashboard" ||
    location.pathname === "/admindashboard/account" ;


  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${Mybackground})`, // Apply background image
        backgroundSize: "cover",
      }}
    >
      {/* Conditionally render Navbare based on the current path */}
      {!isDashboard && <Navbare />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<AllDashboard />}>
       
          <Route path="/dashboard/domande" element={<Domande />} />
       
          <Route index element={<About />} /> 
          <Route path="/dashboard/reclamation" element={<Problem />} />
          <Route path="/dashboard/newreclamation" element={<NewReclamation />} />
          <Route path="/dashboard/about" element={<About />} />
          <Route path="/dashboard/account" element = {<ManageAccount/>} />
          <Route path="/dashboard/historydomonde" element={<HistoryDomonde/>} />
          <Route path="/dashboard/historyreclamation" element={<HistoryReclamation /> } />
        </Route>
        
        <Route path="/adminlogin" index element={<LoginAdmin />} />
        <Route path="/admindashboard" element={<AdminDashboard />}>
        <Route path="/admindashboard/NewAjouns" element={<CreateAjounse />}/>
        <Route path="/admindashboard/raporetype" element={<ReportTable />} />
          
        <Route path="/admindashboard/account" element = {<ManageAccount/>} />
          <Route path="/admindashboard/lesDomonde" element={<LesDomonde />} />
          <Route path="/admindashboard/tableReclamation" element={<ReclamationTable/>} />
          <Route path="/admindashboard/NewadminSubmanagment" element={<NewChefAjouns/>} />
          <Route path="/admindashboard/chefajouns" element={<ChefAjouns />} />
          <Route path="/admindashboard/state" element={<State />} />
        </Route>
<Route path="/chefajounsdashboard"  element={<ChefAjounsDashBourad/>} >
<Route  path="/chefajounsdashboard/lesDomonde" element={<LesDomonde />} />
<Route path="/chefajounsdashboard/tableReclamation" element={<ReclamationTable/>} />

</Route>
<Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    
  );
}

export default Layout;
