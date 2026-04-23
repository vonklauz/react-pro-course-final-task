import classNames from 'classnames';
import { Button } from 'shared/ui/Button';
import s from 'features/Profile/Profile.module.css';
import { useActionState, useEffect } from 'react';
import { FormKey, State, UserFormState } from '../model/types';
import { Input } from 'shared/ui/Input';
import { useUpdateUserMutation } from 'shared/store/api/userApi';
import { useDispatch } from 'react-redux';
import { userActions } from 'shared/store/slices/user';
import { toast } from 'react-toastify';

const formKeys: FormKey[] = [
  { formName: 'name', uiName: 'Имя' },
  { formName: 'about', uiName: 'Описание профессии' },
  { formName: 'avatar', uiName: 'Аватар' },
  { formName: 'email', uiName: 'Электронная почта' },
];

export const UserForm = () => {
  const [updateUser, resultUpdateUser] = useUpdateUserMutation();
  const { data: userData = {} } = resultUpdateUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (resultUpdateUser.isSuccess) {
      dispatch(userActions.setUser(userData));
    }
  }, [resultUpdateUser.isSuccess, userData]);

  async function login(_: State, formData: FormData) {
    const data = formKeys.reduce(
      (acc, key) => ({ ...acc, [key.formName]: formData.get(key.formName) }),
      {} as UserFormState
    );

    let emptyRequiredField = '';
    formKeys.forEach(({ formName, uiName }) => {
      if (!data[formName]) {
        emptyRequiredField = uiName;
      }
    });

    if (emptyRequiredField) {
      return { error: `Заполните поле "${emptyRequiredField}"` };
    }

    console.log('Отправка нативной формы React 19');
    updateUser(data);

    toast.success('Данные профиля обновлены');
    return { success: true };
  }

  const [state, formAction, pending] = useActionState(login, { error: undefined, success: false });
  return (
    <form className={classNames(s['form'])} action={formAction}>
      <div className={s['form__row']}>
        <label className={s['form__label']} htmlFor='name'>
          {''}
          <Input
            className={s['input']}
            name='name'
            id='name'
            type='text'
            placeholder='Введите ваше имя'
            disabled={pending}
          />
        </label>
        <label className={s['form__label']}>
          {''}
          <Input
            className={s['input']}
            name='about'
            id='about'
            type='text'
            placeholder='Описание профессии'
            disabled={pending}
          />
        </label>
      </div>
      <div className={s['form__row']}>
        <label className={s['form__label']}>
          {''}
          <Input
            className={s['input']}
            name='avatar'
            id='avatar'
            type='text'
            placeholder='Введите ссылку на аватарку'
            disabled={pending}
          />
        </label>
        <label className={s['form__label']}>
          {''}
          <Input
            className={s['input']}
            name='email'
            id='email'
            type='email'
            placeholder='email'
            disabled={pending}
          />
        </label>
      </div>
      {state.error && <p className={s['form__error']}>{state.error}</p>}
      <Button type='submit' className={classNames(s['form__btn'], s['secondary'], s['maxContent'])}>
        Сохранить
      </Button>
    </form>
  );
};
