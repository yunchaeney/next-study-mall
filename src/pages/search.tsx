import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import { ProductType } from "@/types/products";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function Search() {
  const router = useRouter();
  const { q } = router.query;

  const [products, setProducts] = useState<ProductType[]>();

  async function getProducts(query: string) {
    const res = await axios.get(`/products?q=${query}`);
    const nextProducts = res.data.results as ProductType[];
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts(q as string);
  }, [q]);

  return (
    <>
      <h1>search Component</h1>
      <SearchForm initialValue={q as string} />
      <h2> {q} 검색 결과 </h2>
      <ProductList products={products} />
    </>
  );
}
