import { CartItem } from 'entities/CartItem';
import s from './CartList.module.css';
import classNames from 'classnames';
import { useMemo } from 'react';

type CartListProps = {
  products: CartProduct[];
};
export const CartList = ({ products }: CartListProps) => {
  const renderCartList = useMemo(() => products.map((p) => <CartItem product={p} key={p.id} />), [products]);

  return <div className={classNames(s['cart-list'])}>{renderCartList}</div>;
};
