import { CartItem, ProductType } from "@/types/products";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useCart } from "@/lib/CartContext";
import styles from "@/styles/Cart.module.scss";
import Image from "next/image";

type ProductCartItem = ProductType & CartItem;

export default function Cart() {
  const { cart, setCart } = useCart();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [cartItems, setCartItems] = useState<ProductCartItem[]>([]);

  // 최초 렌더링 시에만 api call
  useEffect(() => {
    if (!cart || cart.length < 1 || !isInitialLoad) return;

    let list: ProductCartItem[] = [];

    cart.map(async (item) => {
      await getItems(item.productId).then((t) => {
        const cartItem: ProductCartItem = { ...item, ...t };
        list.push(cartItem);
      });
      setCartItems([...list]);
    });

    setIsInitialLoad(false);
  }, [cart, isInitialLoad]);

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
          item.pcs = item.pcs + 1;
        } else {
          item.pcs = item.pcs - 1;
        }
      }
      return item;
    });

    setCartItems(newItems);
    setCart(newItems);
  };

  const handleClickDelete = (productId: number, size: string) => {
    const newItems = cartItems.filter(
      (item) => item.id !== productId || item.size !== size
    );

    setCartItems(newItems);
    setCart(newItems);
  };

  const handleDeleteAll = () => {
    setCartItems([]);
    setCart([]);
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

                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleClickDelete(item.id, item.size)}
                    >
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g strokeWidth="0"></g>
                        <g strokeLinecap="round" strokeLinejoin="round"></g>
                        <g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </button>
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
              <button className={styles.deleteAllBtn} onClick={handleDeleteAll}>
                전체 상품 삭제
              </button>
            </div>
          </>
        ) : (
          <h2>장바구니가 비어 있습니다.</h2>
        )}
      </div>
    </>
  );
}
