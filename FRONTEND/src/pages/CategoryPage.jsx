import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import "../styles/CategoryPage.css";

function CategoryPage() {
  const { nomeCategoria } = useParams();

  const [produtos, setProdutos] = useState([]);
  const [produtosExibidos, setProdutosExibidos] = useState([]);
  const [corSelecionada, setCorSelecionada] = useState("");
  const [loading, setLoading] = useState(true);

  const MAPA_CORES = {
    "Branco": ["Branco", "Off-White", "Neve"],
    "Preto": ["Preto", "Black", "Ébano"],
    "Cinza": ["Cinza", "Grafite", "Chumbo", "Prata"],
    "Bege": ["Bege", "Fendi", "Areia", "Palha"],
    "Amadeirado": ["Cinamomo", "Freijó", "Nogueira", "Carvalho", "Cedro", "Mel", "Choco", "Castanho"]
  };

  const coresDisponiveis = Object.keys(MAPA_CORES);
  const categoriasComFiltro = ["roupeiros", "estofados", "racks e paineis", "comodas", "roupeiro", "comoda"];
  
  const nomeCategoriaLimpo = decodeURIComponent(nomeCategoria || "")
    .trim()
    .toLowerCase();

  const mostrarFiltro = categoriasComFiltro.includes(nomeCategoriaLimpo);

  useEffect(() => {
    async function carregarProdutos() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/produtos/");
        const data = await response.json();

        const filtradosPorCategoria = data.filter((produto) => {
          const categoriaBruta = typeof produto.categoria === "string" 
            ? produto.categoria 
            : produto.categoria?.nome;

          if (!categoriaBruta) return false;

          const pCat = categoriaBruta.trim().toLowerCase();
          const urlCat = nomeCategoriaLimpo;

          return pCat === urlCat || pCat.includes(urlCat) || urlCat.includes(pCat);
        });

        setProdutos(filtradosPorCategoria);
        setProdutosExibidos(filtradosPorCategoria);
        setCorSelecionada(""); 
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, [nomeCategoria, nomeCategoriaLimpo]);

  useEffect(() => {
    if (corSelecionada === "") {
      setProdutosExibidos(produtos);
    } else {
      const tonsPermitidos = MAPA_CORES[corSelecionada].map(t => t.toLowerCase());

      const filtrados = produtos.filter((p) => {
        if (!p.cor) return false;
        const corProduto = p.cor.trim().toLowerCase();
        
        return tonsPermitidos.some(tom => corProduto.includes(tom));
      });

      setProdutosExibidos(filtrados);
    }
  }, [corSelecionada, produtos]);

  return (
    <section className="category-page">
      <div className="category-header">
        <h1>{decodeURIComponent(nomeCategoria)}</h1>
        <p>
          Confira nossos produtos da categoria{" "}
          <strong>{decodeURIComponent(nomeCategoria)}</strong>
        </p>
      </div>

      {mostrarFiltro && (
        <>
          <hr className="divider" /> 
          <div className="color-filter-bar">
            <span>Filtrar por cor:</span>
            <div className="color-options">
              <button 
                className={corSelecionada === "" ? "active" : ""} 
                onClick={() => setCorSelecionada("")}
              >
                Todas
              </button>
              {coresDisponiveis.map((cor) => (
                <button
                  key={cor}
                  className={corSelecionada === cor ? "active" : ""}
                  onClick={() => setCorSelecionada(cor)}
                >
                  {cor}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <hr className="divider" /> 

      {loading ? (
        <div className="loading-container">
          <p>Carregando produtos...</p>
        </div>
      ) : produtosExibidos.length > 0 ? (
        <ProductGrid produtos={produtosExibidos} />
      ) : (
        <div className="empty-container">
          <p>Nenhum produto encontrado para esta seleção.</p>
        </div>
      )}
    </section>
  );
}

export default CategoryPage;