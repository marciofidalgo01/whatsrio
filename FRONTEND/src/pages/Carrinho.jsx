import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "../styles/Carrinho.css";

function Carrinho() {

  const { cart } = useCart();

  const total = cart.reduce(
  (acc, item) => acc + Number(item.preco) * item.quantidade,
  0
);

  return (
    <div className="cart-page">

  {cart.length === 0 ? (

    <div className="cart-empty">

      <img 
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3YwdDBheTF1c2tvZmthZ2Rpdm82bDFsNDNyOGwzdGhta3A1dmY0cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bGFzfLiR1H6ImtQQf6/giphy.gif" 
        alt="Carrinho vazio"
        className="cart-empty-img"
      />

      <h2>Seu carrinho está vazio</h2>

      <p>
        Os produtos irão aparecer aqui caso você os adicione. Basta clicar no produto desejado e depois em "Adicionar ao Carrinho".
      </p>

      <button 
        className="cart-shop-btn"
        onClick={() => window.location.href = "/"}
      >
        Ver produtos
      </button>

    </div>

  ) : (

    <>
    
      <div className="cart-items">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-total">

        {/* <h2>
          Total:
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2> */}

        <div style={
          {gap: '30px',
          display: 'flex'
          }
          }>
          <button 
            className="cart-shop-btn"
            onClick={() => window.location.href = "/"}>
            Voltar
          </button> 
          
        <button
  className="checkout-btn"
  onClick={() => {
    const numeroWhatsApp = "5521990848660";

    const mensagem = cart.map((item) => {
      return `• ${item.nome} /
      ${item.descricao} /
      Qtd: ${item.quantidade}`;
    }).join("\n\n");

    const textoFinal = `Olá! Estou interessado nos seguintes produtos:\n\n${mensagem}`;

    const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoFinal)}`;

    window.open(link, "_blank");
  }}
>
  Finalizar Compra
</button>
        </div>
      </div>
    </>

  )}

</div>
  );
}

export default Carrinho;