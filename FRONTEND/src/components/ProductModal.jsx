import React, { useState, useEffect } from "react";
import "../styles/ProductModal.css";
import { useCart } from "../context/CartContext";

function ProductModal({ produto, onClose }) {
  const { addToCart } = useCart();
  const [mostrarAlert, setMostrarAlert] = useState(false);
  
  const [currentIndex, setCurrentIndex] = useState(0);

const [isClosing, setIsClosing] = useState(false);

const handleClose = () => {
  setIsClosing(true);

  setTimeout(() => {
    onClose();
  }, 300);
};
  useEffect(() => {
    setCurrentIndex(0);
  }, [produto]);

  if (!produto) return null;

const imagens = produto.imagem_url ? [produto.imagem_url] : [];
  const temMultiplasImagens = imagens.length > 1;

  // 👇 2. Funções de navegação
  const proximaImagem = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  const imagemAnterior = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  const numeroWhatsApp = "5521990848660";
  const mensagem = `Olá! Tenho interesse no produto: ${produto.nome}`;
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  useEffect(() => {
    if (mostrarAlert) {
      const timer = setTimeout(() => setMostrarAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [mostrarAlert]);

  return (
   <div className={`modal ${isClosing ? "closing" : "open"}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>&times;</button>

        <h2 className="modal-title">{produto.nome}</h2>

        <div className="modal-body">
          <div className="carousel-wrapper">
            {imagens.length > 0 ? (
              <>
               <img
  src={imagens[currentIndex]}
  alt={`${produto.nome} - ${currentIndex + 1}`}
  className="modal-img"
/>
                
                {temMultiplasImagens && (
                  <div className="carousel-controls">
                    <button className="nav-btn prev" onClick={imagemAnterior}>‹</button>
                    <button className="nav-btn next" onClick={proximaImagem}>›</button>
                    <span className="image-counter">
                      {currentIndex + 1} / {imagens.length}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="no-image">Sem imagem disponível</div>
            )}
          </div>

          <div className="modal-info">
            {produto.categoria && <p><strong>Categoria:</strong> {produto.categoria}</p>}
            {produto.ambiente && <p><strong>Ambiente:</strong> {produto.ambiente}</p>}
            {produto.cor && <p><strong>Cor:</strong> {produto.cor}</p>}
            {produto.descricao && <p className="modal-description">{produto.descricao}</p>}
          </div>
        </div>

        <div className="modal-actions">
          <button
            className="add-cart-btn"
            onClick={() => {
              addToCart(produto);
              setMostrarAlert(false); // reseta
              setTimeout(() => {
                setMostrarAlert(true); // ativa de novo
              }, 10);
            }}
            disabled={!produto.ativo}
          >
            Adicionar ao carrinho
          </button>

          {mostrarAlert && (
            <div className='alertCarrinho'>
              <p>Adicionado com sucesso!</p>
            </div>
          )}

          <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="whatsapp-btn-modal">
            <img src="/zapzap.png" alt="WhatsApp" />
            Comprar pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;