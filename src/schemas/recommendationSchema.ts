import { z } from 'zod';

export const recommendationSchema = z
  .object({
    rating: z
      .number()
      .min(0.5, { message: '별점을 선택해주세요.' })
      .max(5, { message: '평점은 최대 5점입니다.' }),
    review: z.string().optional(),
  })
  .refine(
    ({ rating, review }) => {
      if (rating <= 1.0 || rating === 5) {
        return (review?.trim().length ?? 0) >= 100;
      }
      return true;
    },
    { path: ['review'], message: '1점 이하 또는 5점일 때는 리뷰를 100자 이상 적어주세요.' },
  );
