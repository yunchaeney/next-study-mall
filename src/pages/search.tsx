import SearchForm from "@/components/SearchForm/SearchForm";
import { ProductType } from "@/types/products";
import axios from "@/lib/axios";
import { GetServerSidePropsContext } from "next";
import ProductList from "@/components/ProductList/ProductList";

// pre-rendering : Server side rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const q = context.query["q"];

  if (!q) {
    return {
      props: {
        products: null,
        q: "",
      },
    };
  }

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
      <SearchForm initialValue={q ? (q as string) : ""} />
      {q ? (
        <>
          <h2> &quot; {q} &quot; 검색 결과 </h2>
          <ProductList products={products} />
        </>
      ) : (
        <>
          <h1>상품을 검색해 주세요.</h1>
        </>
      )}
    </>
  );
}
