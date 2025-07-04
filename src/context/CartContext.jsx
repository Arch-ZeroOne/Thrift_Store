import React, { useState, useContext } from "react";
const ItemsContext = React.createContext();

export function useCart() {
  return useContext(ItemsContext);
}

function CartContext({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <>
      <ItemsContext.Provider value={{ cart, setCart }}>
        {children}
      </ItemsContext.Provider>
    </>
  );
}

export default CartContext;
