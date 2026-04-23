import s from './ProfilePage.module.css';
import { ButtonBack } from 'shared/ui/ButtonBack';
import { WithProtection } from 'shared/store/HOCs/WithProtection';
import { PasswordForm, UserForm } from 'features/Profile';

export const ProfilePage = WithProtection(() => {
  return (
    <>
      <ButtonBack />
      <h1 className={s['form__title']}>Мои данные</h1>
      <UserForm />
      <h2 className={s['form__title']}>Изменить пароль</h2>
      <PasswordForm />
    </>
  );
});
