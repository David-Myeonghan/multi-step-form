import { BasicInfoFormValues } from '@/schemas/BasicInfoSchema';

export type ReadingStatus = 'WISHLIST' | 'READING' | 'COMPLETED' | 'PAUSED';

export const READING_STATUS = [
  { label: '읽고 싶은 책', value: 'WISHLIST' },
  { label: '읽는 중', value: 'READING' },
  { label: '읽음', value: 'COMPLETED' },
  { label: '보류 중', value: 'PAUSED' },
] as const;

export const dateFieldConfig: Record<
  BasicInfoFormValues['readingStatus'],
  Array<{ label: string; name: 'publishedAt' | 'readingStartedAt' | 'readingFinishedAt' }>
> = {
  WISHLIST: [],
  READING: [{ label: '독서 시작일', name: 'readingStartedAt' }],
  PAUSED: [{ label: '독서 시작일', name: 'readingStartedAt' }],
  COMPLETED: [
    { label: '독서 시작일', name: 'readingStartedAt' },
    { label: '독서 종료일', name: 'readingFinishedAt' },
  ],
};
