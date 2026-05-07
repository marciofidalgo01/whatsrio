import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Carrinho from "./pages/Carrinho";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import TopButton from "./components/TopButton";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "./pages/Cookies";

import "./styles/global.css";

function App() {
 const location = useLocation();
 const GA_ID = "G-XXXXXXXXXX";


  useEffect(() => {
    window.gtag("config", GA_ID, {
      page_path: location.pathname,
    });
  }, [location]);


const [search, setSearch] = useState("");

 function handleSearch(query){
  setSearch(""); 
  setTimeout(() => {
    setSearch(query);
  }, 0);
}
// LEMBRAR DE ATUALIZAR AS ROTAS NO HOME!!!
  return (
    <>
    <Navbar onSearch={handleSearch} />
    <TopButton />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/produto/:id" element={<ProductDetails />} />
        <Route path="Carrinho" element={<Carrinho />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/categoria/:nomeCategoria" element={<CategoryPage />} />
        
        <Route path="/politica-de-cookies" element={<Cookies />} />
      </Routes>
    </>
  );
}

export default App;