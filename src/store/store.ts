import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import searchReduser from './searchSlice';
import selectedBooksReduser from './selectedBooksSlice';

export const store = configureStore({
  reducer: {
    selectedBooks: selectedBooksReduser,
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const rootReducer = combineReducers({
  selectedBooks: selectedBooksReduser,
  [apiSlice.reducerPath]: apiSlice.reducer,
  search: searchReduser,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
