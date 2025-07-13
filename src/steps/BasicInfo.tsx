import {
  Box,
  Button,
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

export interface StepComponentCommonProps {
  onNext: () => void;
  onPrevious: () => void;
}
export default function BasicInfo({ onNext, onPrevious }: StepComponentCommonProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BasicInfoFormValues>({
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
  const readingStatus = useWatch({ control, name: 'readingStatus' });

  const handleNextClick = (data: BasicInfoFormValues) => {
    console.log(data);
    // if ok,
    onNext();
  };
  const handlePreviousClick = () => {
    onPrevious();
  };

  return (
    <form onSubmit={handleSubmit(handleNextClick)}>
      <Stack gap={2}>
        <Box>
          <Stack gap={2}>
            <Box>
              <TextField
                sx={{ width: '100%' }}
                label="책 제목"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Box>
            <Stack direction="row" gap={2}>
              <TextField
                sx={{ width: '100%' }}
                label="저자"
                {...register('author')}
                error={!!errors.author}
                helperText={errors.author?.message}
              />
              <Controller
                name="publishedAt"
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    label="도서 출판일"
                    {...field}
                    sx={{ width: '100%' }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Reading Status */}
        <Box>
          <FormControl error={!!errors.readingStatus}>
            <FormLabel id="radio-buttons-reading-status-label">독서 상태</FormLabel>
            <Controller
              name={'readingStatus'}
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  {READING_STATUS.map(({ label, value }) => (
                    <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
        </Box>

        {/* Start/End date */}
        <Stack direction="row" justifyContent="space-between" gap={2}>
          {dateFieldConfig[readingStatus].map(({ name, label }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field, fieldState }) => (
                <DatePicker
                  label={label}
                  {...field}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              )}
            />
          ))}
        </Stack>
        <FormAction onPreviousClick={handlePreviousClick} />
      </Stack>
    </form>
  );
}
