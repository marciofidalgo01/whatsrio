const API_URL = "http://127.0.0.1:8000/api/produtos/";

export async function fetchProdutos(query = "") {
  const response = await fetch(`${API_URL}?${query}`);
  const data = await response.json();

  return data.results || data;
}