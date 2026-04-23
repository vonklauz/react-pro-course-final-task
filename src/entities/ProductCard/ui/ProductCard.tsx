import classNames from 'classnames';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { ProductCardProps } from '../model/types';
import { Price } from 'entities/Price';

export const ProductCard = ({
  discount,
  price,
  name,
  tags,
  id,
  images,
  headerAction,
  bottomAction,
}: ProductCardProps) => {
  return (
    <article className={styles['card']}>
      <div className={classNames(styles['card__sticky'], styles['card__sticky_type_top-left'])}>
        <span className={styles['card__discount']}>{discount}</span>
        {tags.length > 0 &&
          tags.map((t) => (
            <span key={t} className={classNames(styles['tag'], styles['tag_type_new'])}>
              {t}
            </span>
          ))}
      </div>
      <div className={classNames(styles['card__sticky'], styles['card__sticky_type_top-right'])}>
        {headerAction}
      </div>
      <Link className={styles['card__link']} to={`/products/${id}`}>
        <img src={images} alt={name} className={styles['card__image']} loading='lazy' />
        <div className={styles['card__desc']}>
          <Price price={price} discountPrice={discount} />
          <h3 className={styles['card__name']}>{name}</h3>
        </div>
      </Link>
      {bottomAction}
    </article>
  );
};
