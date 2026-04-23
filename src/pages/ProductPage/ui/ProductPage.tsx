import s from './ProductPage.module.css';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Rating } from 'shared/ui/Rating';
import { ButtonBack } from 'shared/ui/ButtonBack';
import { ReviewList } from 'widgets/ReviewList/ui/ReviewList';
import { WithProtection } from 'shared/store/HOCs/WithProtection';
import { useGetProductQuery } from 'shared/store/api/productsApi';
import { useAppSelector } from 'shared/store/utils';
import { cartSelectors } from 'shared/store/slices/cart';
import { CartCounter } from 'entities/CartCounter';
import { ProductCartCounter } from 'features/ProductCartCounter';
import { Spinner } from 'shared/ui/Spinner';
import { LikeButton } from 'features/LikeButton';
import { ProductBox } from 'entities/ProductBox';

export const ProductPage = WithProtection(() => {
  const location = useLocation();
  const { pathname } = location;
  const productId = pathname.split('/').at(-1) || '';
  const isProductInCart = useAppSelector((state) => cartSelectors.isInCart(state, productId));

  const { data: product, isLoading } = useGetProductQuery({ id: productId });

  if (!product) {
    return <></>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const { id, name, images, description, price, discount } = product;

  return (
    <>
      <ButtonBack />
      <h1 className={classNames(s['header-title'])}>{name}</h1>
      <p className='acticul'>
        Артикул: <b>2388907</b>
      </p>
      <Rating rating={3} />
      <ProductBox {...{ images, description, price, discount }}>
        <>
          {isProductInCart ? <CartCounter productId={id} /> : <ProductCartCounter product={product} />}
          <LikeButton product={product} />
        </>
      </ProductBox>
      <ReviewList productId={id} productName={name} />
    </>
  );
});
