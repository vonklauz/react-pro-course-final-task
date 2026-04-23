import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '../types';

export const API_URL = process.env.API_URL;

export const customBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.accessToken;

    if (accessToken) {
      headers.set('Authorization', accessToken);
    }
    return headers;
  },
});
