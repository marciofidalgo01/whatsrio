import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSearchTerm } = useCart();

  const [search, setSearch] = useState("");

  const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const [dark, setDark] = useState(getInitialTheme);
const [manualTheme, setManualTheme] = useState(
  localStorage.getItem("theme") !== null
);


  useEffect(() => {
  if (dark) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}, [dark]);

useEffect(() => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleChange = (e) => {
    if (!manualTheme) {
      setDark(e.matches);
    }
  };

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
}, [manualTheme]);

 function handleSubmit() {
  setSearchTerm(search);

  if (search.trim()) {
    const section = document.getElementById("vitrine");
    if (section) {
      section.scrollIntoView({ 
        behavior: "smooth", 
        block: "start"      
      });
    }
  }
}

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  /*
  useEffect(() => {
    setSearchTerm(search);
  }, [search, setSearchTerm]);
  */

  return (
  <nav className={`navbar ${menuOpen ? "active" : ""}`}>
   <div className="navbar-content-title">
     <Link to="/" onClick={() => setMenuOpen(false)}>
      <img src="/logo3.png" alt="Logo" className="logo" />
    </Link>
    
<div className="site-title">
      <h1>
  WhatsRioMóveis
</h1>
    </div>

    <div className="filtro">
      <input
        type="text"
        placeholder="Pesquisar..."
        id="inputPesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="btn-search" onClick={() => { handleSubmit(); setMenuOpen(false); }}>
        <img src="/lupa2.png" alt="Lupa" className="lupa" />
      </button>
    </div>

    <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
      <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      <div className={`bar ${menuOpen ? "open" : ""}`}></div>
    </div>
   </div>

    <div className={`nav-menu ${menuOpen ? "show" : ""}`}>
      
      <button className="btn-close-menu" onClick={() => setMenuOpen(false)}>
        &times;
      </button>
     

      <Link to="Carrinho" className="menu-item-link" onClick={() => setMenuOpen(false)}>
        <div className="carrinho-container">
          <img src="/carrinho.png" alt="Carrinho" className="carrinho" />
        </div>
      </Link>

      <div className="theme-selection">
        <label className="switch">
         <input
  type="checkbox"
  checked={dark}
  onChange={() => {
    setDark(!dark);
  }}
/>
          <span className="slider">
            <span className="icon">{dark ? "🌙" : "☀️"}</span>
          </span>
        </label>
      </div>

      <a
        href="https://wa.me/5521992215332?text=Olá! Estou entrando em contato através do site."
        className="botao-contato"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setMenuOpen(false)}
      >
        <div className="zapzap">
          <img src="/zapzap.png" alt="Zapzap" id="zapImg" />
          <span>Falar no WhatsApp</span>
        </div>
      </a>

       <ul className="mobile-categories">
        <Link to="/categoria/Roupeiros" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Roupeiros</li></Link>
        <Link to="/categoria/Camas" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Camas</li></Link>
        <Link to="/categoria/Estofados" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Estofados</li></Link>
        <Link to="/categoria/Cozinha" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Cozinha</li></Link>
        <Link to="/categoria/Mesas" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Mesas</li></Link>
        <Link to="/categoria/Colchões" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Colchões</li></Link>
        <Link to="/categoria/Racks e Painéis" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Racks e Painéis</li></Link>
        <Link to="/categoria/Eletrodomésticos" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Eletrodomésticos</li></Link>
        <Link to="/categoria/Escrivaninhas" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Escrivaninhas</li></Link>
        <Link to="/categoria/Cômodas" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Cômodas</li></Link>
        <Link to="/categoria/Multiusos" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Multiusos</li></Link>
        <Link to="/categoria/Outros" onClick={() => setMenuOpen(false)}><li className="dropdown-item">Outros</li></Link>
      </ul>
    </div>
  </nav>
);
}

export default Navbar;