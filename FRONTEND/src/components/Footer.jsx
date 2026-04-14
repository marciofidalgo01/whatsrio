import React from "react";
import "../styles/global.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Sobre Nós</h3>
          <p>
            Somos especialistas em venda de móveis e outros produtos,
            oferecendo qualidade e procedência para nossos clientes. Vendas feitas somente pelo WhatsApp.
          </p>
        </div>

        {/* <div className="footer-section">
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Veículos</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">Sobre</a></li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h3>Contato</h3>
          <p>Email: contato@seudominio.com</p>
          <p>(21) 99084-8660</p>
          <p>Rio de Janeiro - RJ</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} whatsriomoveis.com.br</p>
      </div>
    </footer>
  );
}

export default Footer;