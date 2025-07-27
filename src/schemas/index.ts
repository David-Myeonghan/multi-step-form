import { basicInfoSchema } from '@/schemas/BasicInfoSchema';
import { recommendationSchema } from '@/schemas/recommendationSchema';
import { Dayjs } from 'dayjs';
import { ReadingStatus } from '@/steps/BasicInfo/constants';

export type MultiStepFormValues = {
  title: string;
  author: string;
  readingStatus: ReadingStatus;
  publishedAt: null | Dayjs;
  readingStartedAt?: null | Dayjs;
  readingFinishedAt?: null | Dayjs;
  rating: number;
  review: '';
  // 다른 step 필드...
};
export const schemasByStep = {
  1: basicInfoSchema,
  2: recommendationSchema,
  3: basicInfoSchema, //
  4: basicInfoSchema, //
};
