import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => ({
        url: '/users/me',
      }),
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: '/users/me',
        method: 'PATCH',
        body: user,
      }),
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useUpdateUserMutation } = userApi;
