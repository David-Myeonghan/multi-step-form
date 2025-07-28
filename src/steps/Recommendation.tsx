import { Box, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import RHFTextArea from '@/components/RHF/RHFTextArea';
import RHFTextField from '@/components/RHF/RHFTextField';

export default function Recommendation() {
  const { control } = useFormContext();

  return (
    <Stack gap={2}>
      <Box gap={2}>Recommendation Contents</Box>

      <Stack>
        <Box>
          <Typography>코멘트</Typography>
          <RHFTextField label="코멘트" name="review" multiline={true} rows={5} />
        </Box>
      </Stack>
    </Stack>
  );
}
