import { useContext, useEffect, useReducer, createContext } from "react";

const initialState = { cart: JSON.parse(localStorage.getItem("cart")) || [] };
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";
const EMPTY_CART = "EMPTY_CART";

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.item.id && item.size === action.item.size
      );

      if (existingItemIndex >= 0) {
   
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1, totalprice: item.totalprice + item.price }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
  
        return { ...state, cart: [...state.cart, action.item] };
      }
      
    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.id && item.size === action.size
            ? { ...item, quantity: item.quantity + 1, totalprice: item.totalprice + item.price }
            : item
        )
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.id && item.size === action.size) {
            const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
            return { ...item, quantity: newQuantity, totalprice: newQuantity * item.price };
          }
          return item;
        })
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.id || item.size !== action.size),
      };

    case EMPTY_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
}

// Cart context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.cart));
  }, [cartState.cart]);

  return (
    <CartContext.Provider value={{ cart: cartState.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
