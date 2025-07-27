import { z } from 'zod';

const requiredSchema = z.object({
  rating: z.literal(1).or(z.literal(5)),
  review: z.string().min(100, {
    message: '1점 또는 5점일 때는 리뷰를 100자 이상 적어주세요.',
  }),
});

const optionalSchema = z.object({
  rating: z.number().min(1.5).max(4.5),
  review: z.string().optional(),
});

export const recommendationSchema = z.union([requiredSchema, optionalSchema]);
