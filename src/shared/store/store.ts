import { configureStore } from '@reduxjs/toolkit';
import AppApi from '../api/ApiServise';
import { rootReducer } from './reducers/rootReducer';
import { baseApi } from './api/baseApi';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: AppApi,
      },
    }).concat([baseApi.middleware]),
});
