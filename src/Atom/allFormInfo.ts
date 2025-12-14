import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { MultiStepFormValues } from '@/schemas';
import dayjs, { Dayjs } from 'dayjs';

const storage = createJSONStorage<Partial<MultiStepFormValues>>(() => sessionStorage, {
  reviver: (key, value) => {
    // 날짜 문자열을 Dayjs 객체로 변환
    if (
      typeof value === 'string' &&
      (key === 'publishedAt' || key === 'readingStartedAt' || key === 'readingFinishedAt')
    ) {
      return dayjs(value);
    }
    return value;
  },
  replacer: (_key, value) => {
    // Dayjs 객체를 ISO 문자열로 변환
    if (dayjs.isDayjs(value)) {
      return (value as Dayjs).toISOString();
    }
    return value;
  },
});

export const allFormInfoAtom = atomWithStorage<Partial<MultiStepFormValues>>(
  'allFormInfo',
  {},
  storage,
);
