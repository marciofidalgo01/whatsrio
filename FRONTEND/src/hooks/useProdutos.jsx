import { useState, useEffect } from "react";

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);

  function buscarProdutos(query = "") {
    // Remove interrogação no início se o componente de filtro já enviou uma
    const cleanQuery = query.startsWith("?") ? query.slice(1) : query;
    
    const url = `http://localhost:8000/api/produtos/${cleanQuery ? `?${cleanQuery}` : ""}`;

    console.log("Chamando URL:", url); // Importante para debugar no console do navegador

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta da API");
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos da API:", data);
        // Trata tanto se a API retornar um array direto quanto se for paginado (.results)
        setProdutos(data.results || data);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }

  // Busca inicial ao carregar a página
  useEffect(() => {
    buscarProdutos();
  }, []);

  return { produtos, buscarProdutos };
}