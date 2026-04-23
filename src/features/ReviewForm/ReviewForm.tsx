import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from 'shared/ui/Rating';
import { Button } from 'shared/ui/Button';
import { ReviewFormProps } from './model/types';

export const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleClick = () => {
    if (reviewText && rating) {
      console.log('Отправка: ', { reviewText, rating });
      onSubmit(reviewText, rating);
    }
  };

  return (
    <form className={s['form']}>
      <Rating isEdit rating={rating} onChange={setRating} />
      <textarea
        className={classNames(s['input'], s['textarea'])}
        name='text'
        id='text'
        placeholder='Напишите текст отзыва'
        value={reviewText}
        onChange={handleChange}></textarea>
      <Button type='button' className={classNames(s['form__btn'], s['pramary'])} onClick={handleClick}>
        Отправить отзыв
      </Button>
    </form>
  );
};
