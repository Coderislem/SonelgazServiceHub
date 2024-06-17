import React from 'react'
import Layout from './Layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import  "./admin/TopButton-style.css"
import 'leaflet/dist/leaflet.css';
function App() {
  return (
    <BrowserRouter>
 
           <Layout/>
 

    </BrowserRouter>
    // <LayoutClient/>
   
  )
}

export default App
