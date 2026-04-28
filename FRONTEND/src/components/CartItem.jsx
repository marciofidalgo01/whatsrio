import { useCart } from "../context/CartContext";
import "../styles/Carrinho.css";

function CartItem({ item }) {

  const { removeFromCart, addToCart, removeCart1 } = useCart();

  const subtotal = Number(item.preco) * item.quantidade;

  return (

    <div className="cart-card">

{item.imagem_url && (
  <img
    src={item.imagem_url}
    alt={item.nome}
    className="cart-item-img"
  />
)}
      <div className="cart-info">
        <h3>{item.nome}</h3>
{/* 
        <p>
          Preço unitário: 
          {Number(item.preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p> */}

        <p>Quantidade: {item.quantidade}</p>

        {/* <p>
          Subtotal:
          {subtotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p> */}

       <div className="cart-buttons">
  <button onClick={() => addToCart(item)}>+</button>
  <button onClick={() => removeCart1(item.id)}>-</button>
  <button onClick={() => removeFromCart(item.id)}>Remover</button>
</div>

      </div>

    </div>


  );
}

export default CartItem;