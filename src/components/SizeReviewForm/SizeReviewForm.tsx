import { ChangeEvent, FormEvent, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./SizeReviewForm.module.scss";

export default function SizeReviewForm() {
  const [formValue, setFromValue] = useState({
    size: "M",
    sex: "male",
    height: 173,
    fit: "good",
  });

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

  return (
    <>
      <form
        className={styles.sizeForm}
        // onSubmit={handleSubmit}
      >
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
          성별
          <Dropdown
            className={styles.input}
            name="sex"
            value={formValue.sex}
            onChange={handleChange}
            options={[
              { label: "남성", value: "male" },
              { label: "여성", value: "female" },
            ]}
          />
        </label>
        <label className={styles.label}>
          키
          <input
            className={styles.input}
            name="height"
            min="50"
            max="200"
            type="number"
            value={formValue.height}
            onChange={handleInputChange}
          />
        </label>
        <label className={styles.label}>
          사이즈 추천
          <Dropdown
            className={styles.input}
            name="fit"
            value={formValue.fit}
            options={[
              { label: "작음", value: "small" },
              { label: "적당함", value: "good" },
              { label: "큼", value: "big" },
            ]}
            onChange={handleChange}
          />
        </label>
        <button className={styles.submit}>작성하기</button>
      </form>
    </>
  );
}
