import { CartItem, ProductType } from "@/types/products";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useCart } from "@/lib/CartContext";
import styles from "@/styles/Cart.module.scss";
import Image from "next/image";
import Dropdown from "@/components/Dropdown/Dropdown";

type ProductCartItem = ProductType & CartItem;

export default function Cart() {
  const { cart, setCart } = useCart();
  const [cartItems, setCartItems] = useState<ProductCartItem[]>([]);

  useEffect(() => {
    if (!cart || cart.length < 1) return;

    let list: ProductCartItem[] = [];

    cart.map((item) => {
      getItems(item.productId).then((t) => {
        const cartItem: ProductCartItem = { ...item, ...t };
        list.push(cartItem);
        setCartItems(list);
      });
    });
  }, [cart]);

  async function getItems(productId: number) {
    const res = await axios.get(`/products/${productId}`);
    return res.data as ProductType;
  }

  return (
    <>
      <h1>장바구니 목록</h1>
      <div className={styles.section}>
        {cartItems.length > 0 ? (
          <ul className={styles.list}>
            {cartItems.map((item) => (
              <li key={item.id}>
                <Image
                  src={item.imgUrl}
                  alt="상품 이미지"
                  width={200}
                  height={200}
                />

                <div className={styles.itemInfo}>
                  <h2>
                    {item.name} / {item.size}
                  </h2>
                  <h3>{item.salePrice} 원</h3>

                  <div>
                    <h3>{item.salePrice * item.pcs} 원</h3>
                    <div className={styles.pcsInput}>
                      <div> - </div>
                      <div className={styles.input}> {item.pcs} </div>
                      <div> + </div>
                    </div>
                  </div>
                </div>

                <div className={styles.priceInfo}></div>
              </li>
            ))}
          </ul>
        ) : (
          <>비어잇음</>
        )}
      </div>
    </>
  );
}
