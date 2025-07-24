import { Box, Stack } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { BasicInfoFormValues } from '@/schemas/BasicInfoSchema';
import RHFDatePicker from '@/components/RHF/RHFDatePicker';
import RHFTextField from '@/components/RHF/RHFTextField';
import RHFRadio from '@/components/RHF/RHFRadio';

const READING_STATUS = [
  { label: '읽고 싶은 책', value: 'WISHLIST' },
  { label: '읽는 중', value: 'READING' },
  { label: '읽음', value: 'COMPLETED' },
  { label: '보류 중', value: 'PAUSED' },
] as const;

const dateFieldConfig: Record<
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

export default function BasicInfo() {
  const { control } = useFormContext();
  const readingStatus = useWatch({ control, name: 'readingStatus', defaultValue: 'WISHLIST' });

  return (
    <Stack gap={2}>
      <Box>
        <Stack gap={2}>
          {/* Title */}
          <Box>
            <RHFTextField name="title" label="책 제목" />
          </Box>
          {/* Author, Published At */}
          <Stack direction="row" gap={2}>
            <RHFTextField name="author" label="저자" />
            <RHFDatePicker name="publishedAt" label="도서 출판일" />
          </Stack>
        </Stack>
      </Box>

      {/* Reading Status */}
      <Box>
        <RHFRadio radioTitle="독서 상태" name="readingStatus" radioGroupList={READING_STATUS} />
      </Box>

      {/* Start/End date */}
      <Stack direction="row" justifyContent="space-between" gap={2}>
        {dateFieldConfig[readingStatus].map(({ name, label }) => (
          <RHFDatePicker key={name} name={name} label={label} />
        ))}
      </Stack>
    </Stack>
  );
}
