export interface ProductType {
  id: number;
  name: string;
  englishName: string;
  brand: string;
  productCode: string;
  price: number;
  salePrice: number;
  starRating: number;
  starRatingCount: number;
  likeCount: number;
  point: number;
  imgUrl: string;
  createdAt: number;
  updatedAt: number;
}

export interface SizeReviewType {
  id: number;
  sex: "male" | "female" | "none";
  height: number;
  size: "S" | "M" | "L" | "XL";
  fit: "small" | "good" | "big";
  productId: number;
  createdAt: number;
  updatedAt: number;
}

export interface CartItem {
  productId: number;
  size: string;
  pcs: number;
}
