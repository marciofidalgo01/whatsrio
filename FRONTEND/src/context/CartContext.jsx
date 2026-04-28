// import { createContext, useContext, useState } from "react";

// export const CartContext = createContext();

// export function CartProvider({ children }) {

//   const [cart, setCart] = useState([]);

//  function addToCart(product) {

//   setCart((prev) => {

//     const existing = prev.find((item) => item.id === product.id);

//     if (existing) {
//       return prev.map((item) =>
//         item.id === product.id
//           ? { ...item, quantidade: item.quantidade + 1 }
//           : item
//       );
//     }

//     return [...prev, { ...product, quantidade: 1 }];
//   });

// }
//   function removeFromCart(id) {
//     setCart((prev) => prev.filter(p => p.id !== id));
//   }

//    function removeCart1(id) {

//   setCart((prev) =>
//     prev
//       .map((item) =>
//         item.id === id
//           ? { ...item, quantidade: item.quantidade - 1 }
//           : item
//       )
//       .filter((item) => item.quantidade > 0)
//   );

// }

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeCart1 }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {

//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be used inside CartProvider");
//   }

//   return context;
// };

import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantidade: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter(p => p.id !== id));
  }

  function removeCart1(id) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      removeCart1,
      searchTerm,      
      setSearchTerm    
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("erro no useCart / CartContext");
  }
  return context;
};