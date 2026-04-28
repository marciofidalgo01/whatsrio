import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Carrinho from "./pages/Carrinho";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import TopButton from "./components/TopButton";


import "./styles/global.css";

function App() {
const [search, setSearch] = useState("");

 function handleSearch(query){
  setSearch(""); 
  setTimeout(() => {
    setSearch(query);
  }, 0);
}
// LEMBRAR DE ATUALIZAR AS ROTAS NO HOME!!!!!!!!!!!!!
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
      </Routes>
    </>
  );
}

export default App;