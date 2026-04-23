import { Link } from 'react-router-dom';
import LogoIcon from '../assets/logo.svg';
import s from './Logo.module.css';
import { memo } from 'react';

export const Logo = memo(() => {
  return (
    <Link to='/'>
      <div className={s['logo__pic']}>
        <LogoIcon />
      </div>
    </Link>
  );
});
