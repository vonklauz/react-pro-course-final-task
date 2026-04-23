import TrashIcon from 'shared/assets/icons/trash.svg';
import { Link } from 'react-router-dom';
import s from './CartItem.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { cartActions } from 'shared/store/slices/cart';
import { Button } from 'shared/ui/Button';
import { CartCounter } from 'entities/CartCounter';
import { useRef, useState } from 'react';
import { ModalWindow } from 'shared/ui/Modal';

type CartItemProps = {
  product: CartProduct;
};
export const CartItem = ({ product }: CartItemProps) => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const { id, name, images, price, discount } = product;

  const handleDelete = () => {
    dispatch(cartActions.deleteCartProduct(id));
  };

  const handleCloseModal = () => {
    setIsShowDialog(false);
    buttonRef.current?.focus();
  };

  const handleConfirm = async (response: boolean) => {
    if (response) {
      handleDelete();
    }
    handleCloseModal();
  };

  return (
    <>
      <div className={classNames(s['cart-item'])}>
        <div className={classNames(s['cart-item__desc'])}>
          <img src={images} alt={name} className={classNames(s['cart-item__image'])} />

          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
              <Link className={classNames(s['cart-item__title'])} to={`/products/${id}`}>
                <h2>{name}</h2>
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CartCounter productId={id} />

                <div className={classNames(s['cart-item__price'])}>
                  <div className={classNames(s['price-big'], s['price-wrap'])}>
                    <span className={classNames(s['price_old'], s['price_right'])}>{price}</span>
                    <span className={classNames(s['price_discount'], s['price'])}>{price - discount}</span>
                  </div>
                </div>
              </div>
              <Button className={classNames(s['cart-item__bnt-trash'])} ref={buttonRef}>
                <TrashIcon onClick={() => setIsShowDialog(true)} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isShowDialog && (
        <ModalWindow
          title='Удаление товара'
          description='Вы уверены, что хотите удалить товар из корзины?'
          action={handleConfirm}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
