import { useCallback } from 'react';
import { useAddToCart } from 'shared/hooks/useAddToCart';
import { AddToPRoductButtonProps } from '../model/types';
import { Button } from 'shared/ui/Button';

export const AddToCartButton = ({ product, className, disabled }: AddToPRoductButtonProps) => {
  const { addProductToCart } = useAddToCart();

  const handleAdd = useCallback(() => {
    addProductToCart({ ...product, count: 1 });
  }, [product, addProductToCart]);

  return (
    <Button onClick={handleAdd} disabled={disabled} className={className}>
      В корзину
    </Button>
  );
};
