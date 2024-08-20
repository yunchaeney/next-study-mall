import { CartItem, ProductType } from "@/types/products";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useCart } from "@/lib/CartContext";
import styles from "@/styles/Cart.module.scss";
import Image from "next/image";

type ProductCartItem = ProductType & CartItem;

export default function Cart() {
  const { cart, setCart } = useCart();
  const [cartItems, setCartItems] = useState<ProductCartItem[]>([]);

  useEffect(() => {
    if (!cart || cart.length < 1) return;

    let list: ProductCartItem[] = [];

    cart.map(async (item) => {
      await getItems(item.productId).then((t) => {
        const cartItem: ProductCartItem = { ...item, ...t };
        list.push(cartItem);
      });
      setCartItems([...list]);
    });
  }, [cart]);

  async function getItems(productId: number) {
    const res = await axios.get(`/products/${productId}`);
    return res.data as ProductType;
  }

  const handleClickPcsButton = (
    productId: number,
    size: string,
    buttonType: string
  ) => {
    const newItems = cartItems.map((item) => {
      if (item.id === productId && item.size === size) {
        if (buttonType === "increase") {
          console.log("뭐냐");
          item.pcs = item.pcs + 1;
          console.log(item);
        } else {
          item.pcs = item.pcs - 1;
        }
      }
      return item;
    });

    setCartItems(newItems);
    setCart(newItems);
  };

  const getOrderInfo = (type: string) => {
    let value: number;

    switch (type) {
      case "sum":
        value = cartItems.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.pcs;
        }, 0);
        break;

      case "originPrice":
        value = cartItems.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price * currentValue.pcs;
        }, 0);
        break;

      case "salePrice":
        value = cartItems.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            (currentValue.price - currentValue.salePrice) * currentValue.pcs
          );
        }, 0);
        break;

      case "totalPrice":
        value = cartItems.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.salePrice * currentValue.pcs;
        }, 0);
        break;

      default:
        value = 0;
    }

    return value.toLocaleString();
  };

  return (
    <>
      <h1>장바구니 목록</h1>
      <div className={styles.container}>
        {cartItems.length > 0 ? (
          <>
            <div className={styles.section}>
              <ul className={styles.list}>
                {cartItems.map((item, index) => (
                  <li key={`${item.id}${index}`}>
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
                      <h3>
                        <span className={styles.originalPrice}>
                          {item.price.toLocaleString()}원
                        </span>{" "}
                        {item.salePrice.toLocaleString()} 원
                      </h3>

                      <div>
                        <h3 className={styles.price}>
                          {(item.salePrice * item.pcs).toLocaleString()} 원
                        </h3>
                        <div className={styles.pcsInput}>
                          <button
                            disabled={item.pcs < 2}
                            onClick={() =>
                              handleClickPcsButton(
                                item.id,
                                item.size,
                                "decrease"
                              )
                            }
                          >
                            -
                          </button>
                          <div className={styles.input}> {item.pcs} </div>
                          <button
                            onClick={() =>
                              handleClickPcsButton(
                                item.id,
                                item.size,
                                "increase"
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h3>주문 정보</h3>
              <ul className={styles.orderInput}>
                <li>
                  <p>총 수량</p>
                  <p>{getOrderInfo("sum")} 개</p>
                </li>

                <li>
                  <p>총 상품 금액</p>
                  <p>{getOrderInfo("originPrice")} 원</p>
                </li>

                <li>
                  <p>총 할인 금액</p>
                  <p>{getOrderInfo("salePrice")} 원</p>
                </li>

                <li>
                  <p>총 결제 금액</p>
                  <p>{getOrderInfo("totalPrice")} 원</p>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>비어잇음</>
        )}
      </div>
    </>
  );
}
