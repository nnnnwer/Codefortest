import { createContext, useContext, useReducer, useEffect , useState } from "react";
import product from "../data/product1";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();

const initState = {
  product: product || [], 
  cartItems: [],    
  total: 0,
  amount: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  const [orders, setOrders] = useState([]);

  function formatMoney(money) {
  return Number(money).toLocaleString("en-US");
}

  function removeItem(id) {
    dispatch({ type: "REMOVE", payload: id });
  }
  function deleteAllCart() {
    dispatch({ type: "DELETE"});
  }

  function addQuantity(id) {
    dispatch({ type: "ADD", payload: id });
  }

  function subTractQuantity(id) {
    dispatch({ type: "SUBTRACT", payload: id });
  }

  function addToCart(item) {
    dispatch({ type: "ADDTOCART", payload: item });
  }

   function placeOrder() {
  if (state.cartItems.length === 0) {
    alert("");
    return;
  }

  const newOrder = {
    id: Date.now(),
    items: state.cartItems,
    total: state.total,
    status: "Pending",
  };

  setOrders([...orders, newOrder]);
  dispatch({ type: "CLEAR_CART" }); 
}

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.cartItems]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        formatMoney,
        removeItem,
        addQuantity,
        subTractQuantity,
        addToCart,
        orders,
        placeOrder,
        deleteAllCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
