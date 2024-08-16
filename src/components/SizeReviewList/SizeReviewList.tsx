import { SizeReviewType } from "@/types/products";
import styles from "./SizeReviewList.module.scss";

function formatDate(date: Date) {
  const MM = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const YYYY = String(date.getUTCFullYear());

  return `${YYYY}. ${MM}. ${dd}.`;
}

const labels = {
  sex: {
    male: "남자",
    female: "여자",
    none: "비공개",
  },
  fit: {
    small: "작음",
    good: "적당함",
    big: "큼",
  },
};

export default function SizeReviewList({
  sizeReviews,
}: {
  sizeReviews: SizeReviewType[];
}) {
  return (
    <ul className={styles.list}>
      {sizeReviews.map((sizeReview) => (
        <li key={sizeReview.id}>
          <div className={styles.flex}>
            <div>
              ({labels.sex[sizeReview.sex]} {sizeReview.height}cm 기준){" "}
              {sizeReview.size}
            </div>

            <div className={styles.fitText}>{labels.fit[sizeReview.fit]}</div>
          </div>

          <div className={styles.date}>
            {formatDate(new Date(sizeReview.createdAt))}
          </div>
        </li>
      ))}
    </ul>
  );
}
