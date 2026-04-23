import classNames from 'classnames';
import s from './Card.module.css';
import { useAppSelector } from 'shared/store/utils';
import { cartSelectors } from 'shared/store/slices/cart';
import { CartCounter } from 'entities/CartCounter';
import { CardProps } from '../model/types';
import { LikeButton } from 'features/LikeButton';
import { ProductCard } from 'entities/ProductCard';
import { AddToCartButton } from 'features/AddToCart';
import { memo } from 'react';

export const Card = memo(({ product }: CardProps) => {
  const { id } = product;
  const isProductInCart = useAppSelector((state) => cartSelectors.isInCart(state, id));

  return (
    <ProductCard
      {...product}
      headerAction={<LikeButton product={product} />}
      bottomAction={
        <>
          {isProductInCart ? (
            <CartCounter productId={id} />
          ) : (
            <AddToCartButton
              product={product}
              className={classNames(s['card__cart'], s['card__btn'], s['card__btn_type_primary'])}
              disabled={isProductInCart}
            />
          )}
        </>
      }
    />
  );
});
