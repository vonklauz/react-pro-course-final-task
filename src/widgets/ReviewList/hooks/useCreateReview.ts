import { startTransition, useOptimistic } from 'react';
import { OmittedReview } from '../model/types';
import { useAppSelector } from 'shared/store/utils';
import { userSelectors } from 'shared/store/slices/user';

type UiReview = Review | OmittedReview;

export const useCreateReview = (serverReviews: Review[]) => {
  const user = useAppSelector(userSelectors.getUser);
  const [optimisticReviews, addOptimisticReview] = useOptimistic<UiReview[], OmittedReview>(
    serverReviews,
    (state, newReview) => [...state, newReview]
  );

  const appendReview = (text: string, rating: number, clientId: string) => {
    const tempComment: OmittedReview = {
      rating,
      text,
      createdAt: new Date().toISOString(),
      id: clientId,
      user: {
        name: user?.name ?? 'Вы',
      },
    };

    startTransition(() => {
      addOptimisticReview(tempComment);
    });
  };

  return {
    reviews: optimisticReviews,
    appendReview,
  };
};
