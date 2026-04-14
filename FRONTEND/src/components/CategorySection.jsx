import React, { useState, useEffect } from "react";
import "../styles/CategorySection.css";

function CategorySection({ onSearch }) {

  const [openFilter, setOpenFilter] = useState(null);

  const [filters, setFilters] = useState({
    categoria: [],
    ambiente: [],
    cor: []
  });

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside() {
      setOpenFilter(null);
    }

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function toggleFilter(filter) {
    setOpenFilter(openFilter === filter ? null : filter);
  }

  function toggleOption(filter, value) {
    setFilters(prev => {
      const exists = prev[filter].includes(value);

      return {
        ...prev,
        [filter]: exists
          ? prev[filter].filter(item => item !== value)
          : [...prev[filter], value]
      };
    });
  }

  function clearFilters() {
    const empty = {
      categoria: [],
      ambiente: [],
      cor: []
    };

    setFilters(empty);
    onSearch("");
  }

  function buildQuery() {
    const params = new URLSearchParams();

    filters.categoria.forEach(cat => {
      params.append("categoria", cat);
    });

    filters.ambiente.forEach(amb => {
      params.append("ambiente", amb);
    });

    filters.cor.forEach(cor => {
      params.append("cor", cor);
    });

    return params.toString();
  }

  function buscarProdutos() {
    const query = buildQuery();
    onSearch(query);
  }

  function Option({ filter, value, label }) {
    const selected = filters[filter].includes(value);

    return (
      <div
        className="option"
        onClick={(e) => {
          e.stopPropagation();
          toggleOption(filter, value);
        }}
      >
        <input
          type="checkbox"
          checked={selected}
          readOnly
          className="inputCheckBoxCategory"
        />

        <span>{label || value}</span>
      </div>
    );
  }

  return (
    <section className="categorySection">

      <h2 className="filterTitle">Filtrar Produtos</h2>

      <div className="filtersContainer">

        <div className="filterGroup">
          <div
            className="customSelect"
            onClick={(e) => {
              e.stopPropagation();
              toggleFilter("categoria");
            }}
          >
            <span>
              {filters.categoria.length > 0
                ? filters.categoria.join(", ")
                : "Categorias"}
            </span>

            <div
              className={`options ${openFilter === "categoria" ? "open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Option filter="categoria" value="Roupeiros" />
              <Option filter="categoria" value="Camas" />
              <Option filter="categoria" value="Estofados" />
              <Option filter="categoria" value="Cozinha" />
              <Option filter="categoria" value="Mesas" />
              <Option filter="categoria" value="Colchões" />
              <Option filter="categoria" value="Racks e Painéis" />
              <Option filter="categoria" value="Eletrodomésticos" />
              <Option filter="categoria" value="Escrivaninhas" />
              <Option filter="categoria" value="Cômodas" />
              <Option filter="categoria" value="Multiusos" />
              <Option filter="categoria" value="Outros" />
            </div>
          </div>
        </div>

        {/* ===== AMBIENTE ===== */}
        <div className="filterGroup">
          <div
            className="customSelect"
            onClick={(e) => {
              e.stopPropagation();
              toggleFilter("ambiente");
            }}
          >
            <span>
              {filters.ambiente.length > 0
                ? filters.ambiente.join(", ")
                : "Ambiente"}
            </span>

            <div
              className={`options ${openFilter === "ambiente" ? "open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Option filter="ambiente" value="Sala" />
              <Option filter="ambiente" value="Quarto" />
              <Option filter="ambiente" value="Cozinha" />
              <Option filter="ambiente" value="Escritório" />
              <Option filter="ambiente" value="Área externa" />
            </div>
          </div>
        </div>

        {/* ===== COR ===== */}
        <div className="filterGroup">
          <div
            className="customSelect"
            onClick={(e) => {
              e.stopPropagation();
              toggleFilter("cor");
            }}
          >
            <span>
              {filters.cor.length > 0
                ? filters.cor.join(", ")
                : "Cor"}
            </span>

            <div
              className={`options ${openFilter === "cor" ? "open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Option filter="cor" value="Branco" />
              <Option filter="cor" value="Preto" />
              <Option filter="cor" value="Cinza" />
              <Option filter="cor" value="Bege" />
              <Option filter="cor" value="Amadeirado" />
            </div>
          </div>
        </div>

        {/* ===== BOTÕES ===== */}
        <div id="category-section-filter-div">

          <button
            className="filterButton"
            onClick={buscarProdutos}
          >
            Buscar Produtos
          </button>

          <button
            className="filterButton"
            onClick={clearFilters}
          >
            Limpar filtros
          </button>

        </div>

      </div>

    </section>
  );
}

export default CategorySection;