import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import styles from "@/styles/Home.module.css";
import { ProductType } from "@/types/products";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Head from "next/head";

// 정적 생성
// 빌드를 하는 시점에서 데이터를 불러옴
// 계속해서 최신화 해야 하는 코드에서는 부적절
export async function getStaticProps() {
  const res = await axios.get(`/products`);
  const products = res.data.results as ProductType[];
  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }: { products: ProductType[] }) {
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
