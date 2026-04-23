import { Button } from 'shared/ui/Button';
import { useCount } from '../hooks/useCount';
import s from './CartCounter.module.css';
import classNames from 'classnames';
import { Input } from 'shared/ui/Input';

type TCartCounter = {
  productId: string;
};
export const CartCounter = ({ productId }: TCartCounter) => {
  const { count, stock, handleSetCount, handleIncrement, handleDecrement } = useCount(productId);

  return (
    <>
      <div className={classNames(s['button-count'])}>
        <Button onClick={handleDecrement} className={classNames(s['button-count__minus'])}>
          -
        </Button>
        <Input
          onChange={handleSetCount}
          type='number'
          className={classNames(s['button-count__num'])}
          value={count}
        />
        <Button
          onClick={handleIncrement}
          className={classNames(s['button-count__plus'])}
          disabled={count >= stock}>
          +
        </Button>
      </div>
    </>
  );
};
