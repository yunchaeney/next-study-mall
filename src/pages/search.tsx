import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import { ProductType } from "@/types/products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { GetServerSidePropsContext } from "next";

// pre-rendering : Server side rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const q = context.query["q"];

  const res = await axios.get(`/products?q=${q}`);
  const products = res.data.results as ProductType[];

  return {
    props: {
      products,
      q,
    },
  };
}

export default function Search({
  q,
  products,
}: {
  q: string;
  products: ProductType[];
}) {
  return (
    <>
      <h1>search Component</h1>
      <SearchForm initialValue={q as string} />
      <h2> {q} 검색 결과 </h2>
      <ProductList products={products} />
    </>
  );
}
