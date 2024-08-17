import { ChangeEvent, FormEvent, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./AddCart.module.scss";
import { useCart } from "@/lib/CartContext";

export default function AddCart({ productId }: { productId: number }) {
  const [formValue, setFromValue] = useState({
    size: "M",
    pcs: 1,
  });

  const { cart, setCart } = useCart();

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = async (name: string, value: string) => {
    setFromValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValue.pcs || formValue.pcs < 1) {
      alert("수량을 정확히 입력해 주세요.");

      return false;
    }

    const addCartItem = {
      ...formValue,
      productId,
    };

    // 기존 장바구니에 동일한 상품이 있으면 수량을 업데이트
    const existingItemIndex = cart.findIndex(
      (item) => item.productId === productId && item.size === addCartItem.size
    );
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].pcs += addCartItem.pcs;
    } else {
      //   // 새로운 상품 추가
      setCart([...cart, addCartItem]);
    }

    alert("장바구니에 담겼습니다.");
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSumbit}>
        <label className={styles.label}>
          사이즈
          <Dropdown
            className={styles.input}
            name="size"
            value={formValue.size}
            options={[
              { label: "S", value: "S" },
              { label: "M", value: "M" },
              { label: "L", value: "L" },
              { label: "XL", value: "XL" },
            ]}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          수량
          <input
            className={styles.input}
            name="pcs"
            min="1"
            max="10"
            type="number"
            value={formValue.pcs}
            onChange={handleInputChange}
          />
        </label>
        <button className={styles.submit}>담기</button>
      </form>
    </>
  );
}
