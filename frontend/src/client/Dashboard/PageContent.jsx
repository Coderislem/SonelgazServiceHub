import Header from "./Header/Header";
import { useRef } from "react";
import { Outlet, Route,Routes } from "react-router-dom";
import Domande from "./Domande";
import Problem from "./Problem";
import About from "./About";
import AdminHeader from "../../admin/AdminHeader";
import { BellIcon } from "@heroicons/react/24/outline";





function PageContent(){
    const mainContentRef = useRef(null);


    // Scroll back to top on new page load
   

    return(
        <div className="drawer-content flex flex-col ">
           <AdminHeader withicon={true} logoIcon={true} Modifyacount="/dashboard/account"  />
            
          
                <div >
                  <div className="bg-white" style={{border:'1 px solid transaion',borderRadius:'4px', maxWidth:'800px', margin:'0 auto'}}>
                <Outlet/>

                  </div>
               
                </div>
        
        </div> 
    )
    
}


export default PageContent
