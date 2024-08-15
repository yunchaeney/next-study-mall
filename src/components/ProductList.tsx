import Link from "next/link";
import styles from "@/styles/ProductList.module.css";
import { ProductType } from "@/types/products";
import Image from "next/image";

export default function ProductList({
  products = [],
}: {
  products?: ProductType[];
}) {
  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/products/${product.id}`}>
            <div className={styles.image}>
              <Image src={product.imgUrl} alt={product.name} fill />
            </div>
            <span className={styles.productName}>{product.name}</span>
            <br />
            {product.price}원
          </Link>
        </li>
      ))}
    </ul>
  );
}
