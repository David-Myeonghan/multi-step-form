import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';

const ReadingStatus = z.enum(['WISHLIST', 'READING', 'COMPLETED', 'PAUSED'] as const, {
  message: '독서 상태를 선택해주세요.',
});
const DateField = z
  .preprocess(val => (val ? dayjs(val as string) : null), z.any())
  .refine((d): d is Dayjs => dayjs.isDayjs(d), {
    message: '유효한 날짜를 선택해주세요.',
  })
  .nullable();

export const basicInfoSchema = z
  .object({
    title: z.string().nonempty({ message: '책 제목을 입력해주세요.' }),
    author: z.string().nonempty({ message: '책 저자를 입력해주세요.' }),
    readingStatus: ReadingStatus,
    publishedAt: DateField.refine(date => date !== null, {
      message: '출판일을 입력해주세요.',
      path: ['publishedAt'],
    }),
    readingStartedAt: DateField.refine(d => d !== null, {
      message: '독서 시작일은 필수입니다.',
      path: ['readingStartedAt'],
    }),
    readingFinishedAt: DateField.refine(d => d !== null, {
      message: '독서 종료일은 필수입니다.',
      path: ['readingFinishedAt'],
    }),
  })
  .refine(
    data =>
      !data.publishedAt || !data.readingStartedAt || data.publishedAt <= data.readingStartedAt,
    {
      path: ['readingStartedAt'],
      message: '독서 시작일은 출판일 이후여야 합니다.',
    },
  )
  .refine(
    data =>
      !data.readingStartedAt ||
      !data.readingFinishedAt ||
      data.readingStartedAt <= data.readingFinishedAt,

    {
      path: ['readingFinishedAt'],
      message: '독서 종료일은 시작일보다 같거나 이후여야 합니다.',
    },
  );

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
