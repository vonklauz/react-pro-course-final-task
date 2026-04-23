import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './config';
import { RootState } from '../types';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).user.accessToken;

      if (accessToken) {
        headers.set('Authorization', accessToken);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Products'],
});
