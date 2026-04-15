import React, { useState } from "react";
import "../styles/ProductGrid.css";
import ProductModal from "./ProductModal";
import { useCart } from "../context/CartContext"; // 👇 Importante para o filtro

function ProductGrid({ produtos }) {
  const [selectedProduto, setSelectedProduto] = useState(null);
  const { searchTerm } = useCart(); // 👇 Consumindo o termo de busca do Contexto

  const produtosFiltrados = (produtos || []).filter((produto) => {
    const termo = searchTerm.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(termo) ||
      produto.categoria?.toLowerCase().includes(termo) ||
      produto.cor?.toLowerCase().includes(termo) ||
      produto.ambiente?.toLowerCase().includes(termo)
    );
  });

  return (
    <>
      <div className="product-grid" id="vitrine">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div
              key={produto.id}
              className="product-card"
              onClick={() => setSelectedProduto(produto)}
            >
              {/* Renderiza a primeira imagem da lista */}
              {produto.imagens?.length > 0 ? (
                <img
                  src={produto.imagens[0].url}
                  alt={produto.nome}
                  loading="lazy"
                />
              ) : (
                <div className="no-image-placeholder">Sem imagem</div>
              )}

              <div className="product-card-info">
                <h3>{produto.nome}</h3>

                {produto.categoria && (
                  <p>
                    <strong>Categoria:</strong> {produto.categoria}
                  </p>
                )}

                {produto.ambiente && (
                  <p>
                    <strong>Ambiente:</strong> {produto.ambiente}
                  </p>
                )}

                {produto.cor && (
                  <p>
                    <strong>Cor:</strong> {produto.cor}
                  </p>
                )}

                {produto.descricao && (
                  <p className="descricao">{produto.descricao}</p>
                )}

                {produto.preco && (
                  <p className="preco">
                    {Number(produto.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhum produto encontrado... 
              </p> {searchTerm}<br />
            <button 
              onClick={() => window.location.reload()} 
              className="clear-filter-btn"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>

      {/* Modal só abre se houver um produto selecionado */}
      {selectedProduto && (
        <ProductModal
          produto={selectedProduto}
          onClose={() => setSelectedProduto(null)}
        />
      )}
    </>
  );
}

export default ProductGrid;