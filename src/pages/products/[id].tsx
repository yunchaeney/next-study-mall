import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { ProductType, SizeReviewType } from "@/types/products";
import SizeReviewList from "@/components/SizeReciewList";
import Image from "next/image";
import styles from "@/styles/Product.module.css";
import StarRating from "@/components/StarRating";
import { GetStaticPropsContext } from "next";

// 다이나믹경로에서 정적 생성할 path를 지정
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],

    fallback: false, //정적 생성하지 않은 경로로 접근했을 때 fallback 할 것인가
    // true로 하면, 지정하지 않은 경로로 접근하면 getStaticProps를 실행하느라 로딩이 걸림
  };
}

// pre-rendering : 정적 생성
export async function getStaticProps(context: GetStaticPropsContext) {
  const productId = context.params!["id"];

  let product: ProductType | null = null;
  try {
    const res = await axios.get(`/products/${productId}`);
    product = res.data as ProductType;
  } catch (e) {
    return {
      notFound: true, // 존재하지 않는 상품의 경우 404 페이지로 이동
    };
  }
  return {
    props: {
      product,
    },
  };
}

export default function Product({ product }: { product: ProductType }) {
  const [sizeReviews, setSizeReviews] = useState<SizeReviewType[]>([]);
  const router = useRouter();
  const { id } = router.query;

  async function getSizeReviews(targetId: string) {
    const res = await axios.get(`/size_reviews/?product_id=${targetId}`);
    const nextSizeReviews = res.data.results as SizeReviewType[];
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;

    getSizeReviews(id as string);
  }, [id]);

  if (!product) return <h1>로딩...</h1>;

  return (
    <>
      <h1 className={styles.name}>
        {product.name}
        <span className={styles.englishName}>{product.englishName}</span>
      </h1>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image fill src={product.imgUrl} alt={product.name} />
        </div>
        <div>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제품 정보</h2>
            <div className={styles.info}>
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <th>브랜드 / 품번</th>
                    <td>
                      {product.brand} / {product.productCode}
                    </td>
                  </tr>
                  <tr>
                    <th>제품명</th>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <th>가격</th>
                    <td>
                      <span className={styles.salePrice}>
                        {product.price.toLocaleString()}원
                      </span>{" "}
                      {product.salePrice.toLocaleString()}원
                    </td>
                  </tr>
                  <tr>
                    <th>포인트 적립</th>
                    <td>{product.point.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>구매 후기</th>
                    <td className={styles.starRating}>
                      <StarRating value={product.starRating} />{" "}
                      {product.starRatingCount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th>좋아요</th>
                    <td className={styles.like}>
                      ♥{product.likeCount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천</h2>
            <SizeReviewList sizeReviews={sizeReviews ?? []} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
          </section>
        </div>
      </div>
    </>
  );
}
