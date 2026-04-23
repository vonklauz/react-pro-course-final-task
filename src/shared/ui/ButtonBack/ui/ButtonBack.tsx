import { useNavigate } from 'react-router-dom';
import BackSvg from 'shared/assets/icons/back.svg';
import { memo } from 'react';

export const ButtonBack = memo(() => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <BackSvg />
    </button>
  );
});
