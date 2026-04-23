import classNames from 'classnames';
import { ProductBoxProps } from '../model/types';
import truckSVG from 'shared/assets/icons/truck.svg';
import qualitySVG from 'shared/assets/icons/quality.svg';
import styles from './ProductBox.module.css';

export const ProductBox = ({ children, images, description, price, discount }: ProductBoxProps) => (
  <>
    <div className={classNames(styles['product'])}>
      <div className={classNames(styles['product__img-wrapper'])}>
        <img src={images} alt={description} />
      </div>
      <div className={classNames(styles['product__desc'])}>
        <div className={classNames(styles['price-big'], styles['price-wrap'])}>
          <span className={classNames(styles['price_old'], styles['price_left'])}>{`${price} ₽`}</span>
          <span className={classNames(styles['price_discount'], styles['price'])}>{`${
            price - discount
          } ₽`}</span>
        </div>

        {children}
        <div className={classNames(styles['product__delivery'])}>
          <img src={truckSVG} alt='truck' />
          <div className={classNames(styles['product__right'])}>
            <h3 className={classNames(styles['product__name'])}>Доставка по всему Миру!</h3>
            <p className={classNames(styles['product__text'])}>
              Доставка курьером — <span className='bold'> от 399 ₽</span>
            </p>
            <p className={classNames(styles['product__text'])}>
              Доставка в пункт выдачи —<span className={classNames(styles['product__bold'])}> от 199 ₽</span>
            </p>
          </div>
        </div>
        <div className={classNames(styles['product__delivery'])}>
          <img src={qualitySVG} alt='quality' />
          <div className={classNames(styles['product__right'])}>
            <h3 className={classNames(styles['product__name'])}>Гарантия качества</h3>
            <p className={classNames(styles['product__text'])}>
              Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное,
              чтобы удовлетворить ваши нужды.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className={classNames(styles['product__box'])}>
      <h2 className={classNames(styles['product__title'])}>Описание</h2>
      <p className={classNames(styles['product__subtitle'])}>Описание demo</p>
      <h2 className={classNames(styles['product__title'])}>Характеристики</h2>
      <div className={classNames(styles['product__grid'])}>
        <div className={classNames(styles['product__naming'])}>Вес</div>
        <div className={classNames(styles['product__description'])}>1 шт 120-200 грамм</div>
        <div className={classNames(styles['product__naming'])}>Цена</div>
        <div className={classNames(styles['product__description'])}>490 ₽ за 100 грамм</div>
        <div className={classNames(styles['product__naming'])}>Польза</div>
        <div className={classNames(styles['product__description'])}>
          <p>
            Большое содержание аминокислот и микроэлементов оказывает положительное воздействие на общий обмен
            веществ собаки.
          </p>
          <p>Способствуют укреплению десен и жевательных мышц.</p>
          <p>Развивают зубочелюстной аппарат, отвлекают собаку во время смены зубов.</p>
          <p>
            Имеет цельную волокнистую структуру, при разжевывание получается эффект зубной щетки, лучше всего
            очищает клыки собак.
          </p>
          <p>Следует учесть высокую калорийность продукта.</p>
        </div>
      </div>
    </div>
  </>
);
