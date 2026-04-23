import classNames from 'classnames';
import { Button } from 'shared/ui/Button';
import s from 'features/Profile/Profile.module.css';
import { Input } from 'shared/ui/Input';

export const PasswordForm = () => {
  return (
    <form className={classNames(s['form'])}>
      <div className={classNames(s['form__row'], s['form__row_min'])}>
        <label className={s['form__label']}>
          {''}
          <Input className={s['input']} name='password' id='password' type='password' placeholder='Пароль' />
        </label>
      </div>
      <button type='submit' className={classNames(s['form__btn'], s['secondary'], s['maxContent'])}>
        Сохранить
      </button>
    </form>
  );
};
