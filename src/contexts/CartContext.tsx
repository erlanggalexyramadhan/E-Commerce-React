import { createContext, ReactNode, useEffect, useState } from "react";

interface CartItem {
  category: string;
  id: number;
  image: string;
  title: string;
  price: number;
  amount: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  itemAmount: number;
  total: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, amount: cartItem.amount + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      const newItem = { ...item, amount: 1 };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseAmount = (id: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      addToCart(item);
    }
  };

  const decreaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      if (cartItem.amount > 1) {
        const newCart = cart.map((item) =>
          item.id === id ? { ...item, amount: cartItem.amount - 1 } : item
        );
        setCart(newCart);
      } else {
        removeFromCart(id);
      }
    }
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    itemAmount,
    total,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
