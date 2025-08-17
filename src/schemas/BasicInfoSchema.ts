import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';

const DateField = z
  .custom<Dayjs | null>(val => val === null || dayjs.isDayjs(val), {
    // 실패할 때 에러메시지 발생. (null 이 아니거나, dayjs 값이 아닐 때)
    message: '유효한 날짜를 선택해주세요.',
  })
  .nullable();

const BaseSchema = z.object({
  title: z.string().nonempty({ message: '책 제목을 입력해주세요.' }),
  author: z.string().nonempty({ message: '책 저자를 입력해주세요.' }),
  publishedAt: DateField.refine(d => d !== null, {
    message: '책 출판일을 입력해주세요.',
  }),
});

// readingStatus = wishlist 일 때, (should)Unregister 이면 값을 완전히 제거해서 오류.
// 해결: 1. unregister 대신, (effect에서) setValue(null). 2. 스키마에서 undefined 허용
const Wishlist = BaseSchema.extend({
  readingStatus: z.literal('WISHLIST'),
  readingStartedAt: z.union([z.null(), z.undefined()]),
  readingFinishedAt: z.union([z.null(), z.undefined()]),
  // readingStartedAt: z.literal(null),
  // readingFinishedAt: z.literal(null),
});

const Reading = BaseSchema.extend({
  readingStatus: z.literal('READING'),
  readingStartedAt: DateField.refine(value => value !== null, {
    message: '독서 시작일을 입력해주세요',
  }),
  readingFinishedAt: z.union([z.null(), z.undefined()]),
}).refine(
  data => !data.publishedAt || !data.readingStartedAt || data.publishedAt <= data.readingStartedAt,
  {
    path: ['readingStartedAt'],
    message: '독서 시작일은 출판일 이후여야 합니다.',
  },
);

const Paused = BaseSchema.extend({
  readingStatus: z.literal('PAUSED'),
  readingStartedAt: DateField.refine(value => value !== null, {
    message: '독서 시작일을 입력해주세요',
  }),
  readingFinishedAt: z.union([z.null(), z.undefined()]),
}).refine(
  data => !data.publishedAt || !data.readingStartedAt || data.publishedAt <= data.readingStartedAt,
  {
    path: ['readingStartedAt'],
    message: '독서 시작일은 출판일 이후여야 합니다.',
  },
);

const Completed = BaseSchema.extend({
  readingStatus: z.literal('COMPLETED'),
  readingStartedAt: DateField.refine(value => value !== null, {
    message: '독서 시작일을 입력해주세요',
  }),
  readingFinishedAt: DateField.refine(value => value !== null, {
    message: '독서 종료일을 입력해주세요',
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
  .refine(data => data.readingStartedAt! <= data.readingFinishedAt!, {
    message: '독서 종료일은 시작일보다 같거나 이후여야 합니다.',
    path: ['readingFinishedAt'],
    // 에러 2개 필드에 달려면 superRefine, or refine를 path 바꿔서 2번 달아주기
  });

export const basicInfoSchema = z.discriminatedUnion('readingStatus', [
  Wishlist,
  Reading,
  Paused,
  Completed,
]);
export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
