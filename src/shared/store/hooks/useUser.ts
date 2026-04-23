import { useGetUserQuery } from '../api/userApi';
import { userSelectors } from '../slices/user';
import { useAppSelector } from '../utils';

export const useUser = () => {
  const { isLoading, isError, error, data, isFetching } = useGetUserQuery();

  return {
    isLoading,
    isError,
    error,
    data,
    isFetching,
  };
};
