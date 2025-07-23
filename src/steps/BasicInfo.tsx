import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BasicInfoFormValues, basicInfoSchema } from '@/schemas/BasicInfoSchema';
import FormAction from '@/components/FormAction';
import { basicInfoAtom } from '@/Atom/BasinInfo';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import RHFDatePicker from '@/components/RHF/RHFDatePicker';
import RHFProvider from '@/components/RHF/RHFProvider';
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

export interface StepComponentCommonProps {}
export default function BasicInfo({}: StepComponentCommonProps) {
  const [basicInfoStorage, setBasicInfo] = useAtom(basicInfoAtom);
  const methods = useForm<BasicInfoFormValues>({
    defaultValues: {
      title: '',
      author: '',
      readingStatus: 'WISHLIST',
      publishedAt: null,
      readingStartedAt: null,
      readingFinishedAt: null,
    },
    shouldUnregister: true,
    resolver: zodResolver(basicInfoSchema),
  });
  const { control, reset } = methods;

  const readingStatus = useWatch({ control, name: 'readingStatus' });

  const handleNextClick = (data: BasicInfoFormValues) => {
    // console.log(data);
    // if ok,
    setBasicInfo(data);
    // onNext();
  };

  useEffect(() => {
    if (
      typeof basicInfoStorage === 'object' &&
      basicInfoStorage !== null &&
      Object.keys(basicInfoStorage).length > 0
    ) {
      reset(basicInfoStorage);
    }
  }, []);

  return (
    <RHFProvider methods={methods} onSubmit={handleNextClick}>
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

        {/* Form Action ?? */}
        <FormAction />
      </Stack>
    </RHFProvider>
  );
}
