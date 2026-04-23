import s from './ProductCartCounter.module.css';
import classNames from 'classnames';
import { useCount } from '../hooks/useCount';
import { Button } from 'shared/ui/Button';
import { useAddToCart } from 'shared/hooks/useAddToCart';
import { ProductCartCounterProps } from '../model/types';
import { Input } from 'shared/ui/Input';

export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
  const { count, handleCount, handleCountMinus, handleCountPlus } = useCount();
  const { addProductToCart } = useAddToCart();

  return (
    <div className={classNames('product__btn-wrap')}>
      <div className={s['button-count']}>
        <Button className={s['button-count__minus']} onClick={handleCountMinus}>
          -
        </Button>
        <Input type='number' className={s['button-count__num']} value={count} onChange={handleCount} />
        <Button className={s['button-count__plus']} onClick={handleCountPlus}>
          +
        </Button>
      </div>
      <Button
        onClick={() => addProductToCart({ ...product, count })}
        className={classNames(s['button'], s['button_type_primary'])}>
        В корзину
      </Button>
    </div>
  );
};
