import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gutendex.com' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ str, page }) => `/books?search=${str}&page=${page}`,
    }),
    getBookDetails: builder.query({
      query: (bookId) => `/books/${bookId}`,
    }),
  }),
});

export { apiSlice };
