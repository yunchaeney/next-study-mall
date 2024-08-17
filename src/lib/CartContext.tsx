import { CartItem } from "@/types/products";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 최초 로컬스토리지를 조회하여 cart에 저장
  useEffect(() => {
    const cartJSON = localStorage.getItem("cart");

    if (cartJSON) {
      setCart(JSON.parse(cartJSON));
    }
  }, []);

  // cart 값이 바뀌면 그 내용을 로컬스토리지에 저장
  useEffect(() => {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem("cart", cartJSON);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext 안에서 써야 합니다");
  }

  return cartContext;
}
