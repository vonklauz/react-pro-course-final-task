import classNames from 'classnames';
import s from './Header.module.css';
import { Logo } from 'shared/ui/Logo';
import { useAppSelector } from 'shared/store/utils';
import { userActions, userSelectors } from 'shared/store/slices/user';
import { Search } from 'features/Search/ui/Search';
import { LoggedInHeaderOptions } from 'features/LoggedInHeaderOptions';
import { useDispatch } from 'react-redux';
import { useGetUserQuery, useLazyGetUserQuery } from 'shared/store/api/userApi';
import { useEffect } from 'react';

export const Header = () => {
  const accessToken = useAppSelector(userSelectors.getAccessToken);
  const dispatch = useDispatch();

  //Пользователя запрашиваем здесь, тк Header фигурирует на всех страницах
  const [getUser, resultGetUser] = useLazyGetUserQuery();
  const { data: userData = {} } = resultGetUser;

  useEffect(() => {
    if (accessToken) {
      getUser();
    }
  }, [accessToken]);

  useEffect(() => {
    if (resultGetUser.isSuccess) {
      dispatch(userActions.setUser(userData));
    }
  }, [resultGetUser.isSuccess, userData]);

  return (
    <header className={s.header}>
      <div className={classNames('container', s.header__wrapper)}>
        <Logo />
        <Search />
        {accessToken && <LoggedInHeaderOptions />}
      </div>
    </header>
  );
};
