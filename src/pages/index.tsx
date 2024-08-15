import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import styles from "@/styles/Home.module.css";
import { ProductType } from "@/types/products";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Head from "next/head";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>();

  async function getProducts() {
    const res = await axios.get(`/products`);
    const nextProducts = res.data.results as ProductType[];
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Head>
        <title>타이틀</title>
      </Head>
      <h1>Codeitmall</h1>
      <SearchForm />

      <ProductList products={products} />
    </>
  );
}
