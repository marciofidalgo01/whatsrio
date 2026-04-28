import React, { useRef, useState, useEffect } from "react";

import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { useProdutos } from "../hooks/useProdutos";

import { Link } from "react-router-dom";

import heroImg1 from '../assets/hero1.png';
import heroImg2 from '../assets/hero2.png';
import heroImg3 from '../assets/hero3.png';


function Home({search}) {  

const imagensDoHero = [heroImg1, heroImg2, heroImg3];

  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtual((prevIndice) => 
        prevIndice === imagensDoHero.length - 1 ? 0 : prevIndice + 1
      );
    }, 7000);

    
    return () => clearInterval(intervalo);
  }, [imagensDoHero.length]);


  
  const { produtos, buscarProdutos } = useProdutos();
  const produtosRef = useRef(null);
  

  const textRef = useRef(null);
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleMouseMove = (e) => {
    const { offsetWidth, offsetHeight } = textRef.current;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const rotateY = ((x / offsetWidth) - 0.5) * 25;
    const rotateX = ((y / offsetHeight) - 0.5) * -25;

    textRef.current.style.transform = `
      perspective(600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  };



  const resetTransform = () => {
    textRef.current.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg)";
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   buscarProdutos();
  // }, []);
useEffect(() => {
  if (search) {
    buscarProdutos(`nome=${search}`);
  } else {
    buscarProdutos();
  }
}, [search]);

useEffect(() => {
  if (search && produtos.length > 0) {
    setTimeout(() => {
      produtosRef.current?.scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  }
}, [search]);
  
const [offsetY, setOffsetY] = useState(0);

useEffect(() => {
  if (open) {
    setOffsetY(40); // 
  } else {
    setOffsetY(0);
  }
}, [open]);



  return (
    <div id="homeDiv">

     <div className="heroBanner">
      {imagensDoHero.map((heroImg, index) => (
        <div
          key={index}
          className={`heroBgLayer ${index === indiceAtual ? 'active' : ''}`}
          style={{ backgroundImage: `url(${heroImg})`}}
          id={`heroLayer`}
        />
      ))}

        <div className="divStyleBanner">
         <div id="divTextBanner">
           <h2
            ref={textRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTransform}
          >
           Móveis de alta qualidade! <br /> <span> ⮕ Entregas por Rio de Janeiro e região. ⬅</span> 
           <p>Consulte preço, frete e montagem pelo whatsapp: </p> 
            <div id="linkHeroDiv">
              <a   href="https://wa.me/5521992215332?text=Olá! Estou entrando em contato através do site." target="_blank" rel="noopener noreferrer">
             +55 21 99084-8660  <img src="./zapzap.png" alt="Zapzap" id="zapImg" /></a>
            </div>
        
          </h2>
         </div>
        </div>

        <div className="divStyleBanner">
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn-primary"
              onClick={() => setOpen(!open)}
              style={{
                transform: `translateY(-${offsetY}px)`,
                transition: "transform 0.25s ease"
              }}
            >
              O que você procura? ▼
            </button>

            <ul className={`dropdown-menu ${open ? "open" : ""}`}  
               style={{
                transform: `translateY(-${offsetY}px)`,
                transition: "transform 0.25s ease"
              }}>
  <Link to="/categoria/Roupeiros">
    <li className="dropdown-item">Roupeiros</li>
  </Link>

  <Link to="/categoria/Camas">
    <li className="dropdown-item">Camas</li>
  </Link>

  <Link to="/categoria/Estofados">
    <li className="dropdown-item">Estofados</li>
  </Link>

  <Link to="/categoria/Cozinha">
    <li className="dropdown-item">Cozinha</li>
  </Link>

  <Link to="/categoria/Mesas">
    <li className="dropdown-item">Mesas</li>
  </Link>

  <Link to="/categoria/Colchões">
    <li className="dropdown-item">Colchões</li>
  </Link>

  <Link to="/categoria/Racks e Painéis">
    <li className="dropdown-item">Racks e Painéis</li>
  </Link>

  <Link to="/categoria/Eletrodomésticos">
    <li className="dropdown-item">Eletrodomésticos</li>
  </Link>

  <Link to="/categoria/Escrivaninhas">
    <li className="dropdown-item">Escrivaninhas</li>
  </Link>

  <Link to="/categoria/Cômodas">
    <li className="dropdown-item">Cômodas</li>
  </Link>

  <Link to="/categoria/Multiusos">
    <li className="dropdown-item">Multiusos</li>
  </Link>

  <Link to="/categoria/Outros">
    <li className="dropdown-item">Outros</li>
  </Link>
            </ul>
          </div>
        </div>
      </div>

            <CategorySection onSearch={buscarProdutos} />

      <div id="divDisplayContent" ref={produtosRef}>
  <ProductGrid produtos={produtos} />
</div>

      <Footer />
    </div>
  );
}

export default Home;