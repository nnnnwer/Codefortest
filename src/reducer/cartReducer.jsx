// import product from "../data/product1";

const cartReducer = (state, action) => {
  if (action.type === "CALCULATE_TOTAL") {
    const { total, amount } = state.cartItems.reduce(
      (cartTotal, item) => {
        const { price, quantity } = item;
        const totalprice = price * quantity;
        cartTotal.total += totalprice;
        cartTotal.amount += quantity;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    ); 
    return { ...state, total, amount };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      cartItems: state.cartItems.filter((item) => item.id !== action.payload)
    };
  }

  if (action.type === "ADD") {
    const exist = state.cartItems.find(item => item.id === action.payload);
    let updateCart;

    if (exist) {
      updateCart = state.cartItems.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      const productToAdd = state.product.find(p => p.id === action.payload);
      if (productToAdd) {
        updateCart = [...state.cartItems, { ...productToAdd, quantity: 1 }];
      } else {
        updateCart = [...state.cartItems];
      }
    }
    return { ...state, cartItems: updateCart };
  }

  if (action.type === "SUBTRACT") {
    const exist = state.cartItems.find(item => item.id === action.payload);
    let updateCart;

    if (exist) {
      updateCart = state.cartItems
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter(item => item.quantity > 0);
    } else {
      updateCart = [...state.cartItems];
    }
    return { ...state, cartItems: updateCart };
  }

  if (action.type === "ADDTOCART") {
    const newItem = action.payload;
    const existingItem = state.cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
      const updateCart = state.cartItems.map((item) =>
        item.id === newItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updateCart };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, { ...newItem, quantity: 1 }],
      };
    }
  }

  
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cartItems: [],
      total: 0,
      amount: 0
    };
  }

  return state;
};

export default cartReducer;
 