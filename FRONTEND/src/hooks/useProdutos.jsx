import { useState, useEffect } from "react";

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);

  function buscarProdutos(query = "") {
    const cleanQuery = query.startsWith("?") ? query.slice(1) : query;
    
    const url = `http://localhost:8000/api/produtos/${cleanQuery ? `?${cleanQuery}` : ""}`;

    // console.log("Chamando URL:", url); 

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erro na resposta da API");
        return res.json();
      })
      .then((data) => {
        // console.log("Dados recebidos da API:", data);
        setProdutos(data.results || data);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return { produtos, buscarProdutos };
}