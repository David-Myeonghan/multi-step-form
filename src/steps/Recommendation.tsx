import { useFormContext, useWatch } from 'react-hook-form';
import RHFTextField from '@/components/RHF/RHFTextField';
import { Stack, Typography } from '@mui/material';
import RatingStar from '@/components/RatingStar';

export default function Recommendation() {
  const {
    control,
    setValue,
    formState: { isReady, errors },
  } = useFormContext();

  return (
    <Stack gap={3}>
      <Stack gap={1} alignItems="center">
        <Typography>별점을 선택해주세요.</Typography>
        <RatingStar name="rating" />
      </Stack>

      <Stack>
        <Stack gap={1}>
          <Typography>코멘트</Typography>
          <RHFTextField
            label="책에 대한 생각을 자유롭게 남겨주세요"
            name="review"
            multiline={true}
            rows={5}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
