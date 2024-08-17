import { GetStaticPropsContext } from "next";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ProductType, SizeReviewType } from "@/types/products";
import axios from "@/lib/axios";
import StarRating from "@/components/StarRating";
import SizeReviewList from "@/components/SizeReviewList/SizeReviewList";
import SizeReviewForm from "@/components/SizeReviewForm/SizeReviewForm";
import styles from "@/styles/Product.module.scss";
import AddCart from "@/components/AddCart/AddCart";

type PartialSizeReview = Pick<
  SizeReviewType,
  "size" | "sex" | "height" | "fit"
>;

// 다이나믹경로에서 정적 생성할 path를 지정
export async function getStaticPaths() {
  const res = await axios.get("/products/");
  const products = res.data.results as ProductType[];
  const paths = products.map((product) => ({
    params: { id: String(product.id) },
  }));

  return {
    paths,
    fallback: true, //정적 생성하지 않은 경로로 접근했을 때 fallback 할 것인가
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
      productId,
      product,
    },
  };
}

export default function Product({
  productId,
  product,
}: {
  productId: string;
  product: ProductType;
}) {
  const [sizeReviews, setSizeReviews] = useState<SizeReviewType[]>([]);

  // 사이즈 리뷰 가져오기
  async function getSizeReviews(targetId: string) {
    const res = await axios.get(`/size_reviews/?product_id=${targetId}`);
    const nextSizeReviews = res.data.results as SizeReviewType[];
    setSizeReviews(nextSizeReviews);
  }

  const handleSubmit = async (formValue: PartialSizeReview) => {
    const sizeReview = {
      ...formValue,
      productId: product.id,
    };
    const response = await axios.post("/size_reviews/", sizeReview);
    const newSizeReview = response.data;
    setSizeReviews((prevSizereviews) => [newSizeReview, ...prevSizereviews]);
  };

  useEffect(() => {
    if (!productId) return;

    getSizeReviews(productId);
  }, [productId]);

  if (!product) return <h1>로딩...</h1>;

  return (
    <>
      {/* 이름 */}
      <h1 className={styles.name}>
        {product.name}
        <span className={styles.englishName}>{product.englishName}</span>
      </h1>
      {/* 제품 정보 */}
      <div className={styles.section}>
        {/* 이미지 */}
        <div className={styles.image}>
          <Image fill src={product.imgUrl} alt={product.name} />
        </div>
        <div>
          <h3 className={styles.title}>제품 정보</h3>
          <div className={styles.content}>
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
                    <span className={styles.originalPrice}>
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
          <div className={styles.addCart}>
            <h3 className={styles.title}>장바구니 담기</h3>
            <div className={styles.content}>
              <AddCart productId={product.id} />
            </div>
          </div>
        </div>
      </div>
      {/* 사이즈 리뷰 및 추천 */}
      <div className={styles.section}>
        <div>
          <h3 className={styles.title}>사이즈 추천</h3>
          <div className={styles.content}>
            <SizeReviewList sizeReviews={sizeReviews} />
          </div>
        </div>

        <div>
          <h3 className={styles.title}>사이즈 추천하기</h3>
          <div className={styles.content}>
            <SizeReviewForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}
