import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';

const ReadingStatus = z.enum(['WISHLIST', 'READING', 'COMPLETED', 'PAUSED'] as const, {
  message: '독서 상태를 선택해주세요.',
});
const DateField = z
  .custom<Dayjs | null>(val => val === null || dayjs.isDayjs(val), {
    // 실패할 때 에러메시지 발생. (null 이 아니거나, dayjs 값이 아닐 때)
    message: '유효한 날짜를 선택해주세요.',
  })
  .nullable();

export const basicInfoSchema = z
  .object({
    title: z.string().nonempty({ message: '책 제목을 입력해주세요.' }),
    author: z.string().nonempty({ message: '책 저자를 입력해주세요.' }),
    readingStatus: ReadingStatus,
    publishedAt: DateField,
    readingStartedAt: DateField,
    readingFinishedAt: DateField,
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
      // 위 조건이 false 일 때 에러 메시지 발생
      path: ['readingFinishedAt'],
      message: '독서 종료일은 시작일보다 같거나 이후여야 합니다.',
    },
  )
  .transform(data => {
    if (data.readingStatus === 'WISHLIST') {
      return { ...data, readingStartedAt: null, readingFinishedAt: null };
    } else if (data.readingStatus === 'READING' || data.readingStatus === 'PAUSED') {
      return { ...data, readingFinishedAt: null };
    }
    return data;
  });

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
