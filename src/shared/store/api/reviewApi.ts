import { baseApi } from './baseApi';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<Review[], string>({
      query: (productId) => ({
        url: `/reviews/${productId}`,
      }),
    }),
    leaveReview: builder.mutation<Review, { text: string; rating: number; productId: string }>({
      query: ({ text, rating, productId }) => ({
        url: `/reviews/leave/${productId}`,
        method: 'POST',
        body: { text, rating },
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useLeaveReviewMutation } = reviewApi;
