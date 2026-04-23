export type ReviewListProps = {
  productId: string;
  productName: string;
};

export type OmittedReview = {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: { name: string };
};
