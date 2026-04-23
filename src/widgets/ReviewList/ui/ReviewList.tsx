import classNames from 'classnames';
import s from './ReviewList.module.css';
import { Rating } from 'shared/ui/Rating';
import { ReviewForm } from 'features/ReviewForm/ReviewForm';
import { ReviewListProps } from '../model/types';
import { useEffect, useState } from 'react';
import AppApi from 'shared/api/ApiServise';
import { useCreateReview } from '../hooks/useCreateReview';
import { useLeaveReviewMutation } from 'shared/store/api/reviewApi';

export const ReviewList = ({ productId, productName }: ReviewListProps) => {
  const [rawReviews, setRawReviews] = useState<Review[]>([]);
  const { reviews, appendReview } = useCreateReview(rawReviews);
  const [leaveReview] = useLeaveReviewMutation();

  const handleSubmit = async (text: string, rating: number) => {
    const clientId = crypto.randomUUID().toString();
    appendReview(text, rating, clientId);
    const rs = await leaveReview({ text, rating, productId }).unwrap();
    setRawReviews((prev) => [...prev, { ...rs, id: clientId }]);
  };

  useEffect(() => {
    const getReviews = async () => {
      const rs = await AppApi.getProductReviews(productId);
      setRawReviews(rs);
    };
    getReviews();
  }, [productId]);

  return (
    <div className={classNames(s['product__reviews'])}>
      {reviews.map((review) => (
        <div className={s['review']} key={review.id}>
          <div className={s['review__header']}>
            <div className={s['review__name']}>{review.user.name}</div>
            <div className={s['review__date']}>{new Date(review.createdAt).toLocaleDateString('ru-RU')}</div>
          </div>
          <Rating rating={review.rating} />
          <p className={s['review__text']}>{review.text}</p>
        </div>
      ))}
      <h2>Отзыв о товаре {productName}</h2>
      <ReviewForm onSubmit={handleSubmit} />
    </div>
  );
};
