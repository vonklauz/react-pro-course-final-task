import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ConfirmDialog.module.css';
import type { ConfirmDialogProps } from '../model/types';
import { Button } from 'shared/ui/Button';
import classNames from 'classnames';

export const ModalWindow = ({ title, description, action, onClose }: ConfirmDialogProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dialogContainer = document.getElementById('modal-root');
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    buttonCloseRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEscDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscDown);

    return () => {
      window.removeEventListener('keydown', handleEscDown);
    };
  }, [onClose]);

  const handleButtonClick = (value: boolean) => {
    if (value) {
      setIsDeleting(true);
    }
    action(value);
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <Button className={styles.closeBtn} ref={buttonCloseRef} onClick={onClose}>
          X
        </Button>
        <h1 className='text-center'>{title}</h1>
        <p className='text-center'>{description}</p>
        <div className={styles.btnWrapper}>
          <Button
            className={classNames(styles.btn, styles.btnConfirm)}
            onClick={() => !isDeleting && handleButtonClick(true)}>
            Подтвердить
          </Button>
          <Button
            className={classNames(styles.btn, styles.btnDecline)}
            onClick={() => !isDeleting && onClose()}>
            Отмена
          </Button>
        </div>
        {isDeleting && <p className='text-center mt-4'>Удаление элемента...</p>}
      </div>
    </div>,
    dialogContainer!
  );
};
