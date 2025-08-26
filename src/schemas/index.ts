import { basicInfoSchema } from '@/schemas/BasicInfoSchema';
import { recommendationSchema } from '@/schemas/recommendationSchema';
import { quoteSharingSchema } from '@/schemas/quoteSharingSchema';
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
  quotation: '';
  quotationPage: number;
  totalPage: number;
  isPublic: boolean;
};
export const schemasByStep = {
  1: basicInfoSchema,
  2: recommendationSchema,
  3: quoteSharingSchema, //
};
