import { SignUpFormValues } from 'features/Auth/SignUpForm/utils/types';
import { baseApi } from './baseApi';

type SignUpResponse = {
  user: Pick<User, 'id' | 'email'>;
  accessToken: Token['accessToken'];
};

type SignInResponse = {
  user: Pick<User, 'id' | 'email'>;
  accessToken: Token['accessToken'];
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpFormValues>({
      query: (signUpFormValues) => ({
        url: '/auth/register',
        method: 'POST',
        body: signUpFormValues,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignUpFormValues>({
      query: (signInFormValues) => ({
        url: '/auth/login',
        method: 'POST',
        body: signInFormValues,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
