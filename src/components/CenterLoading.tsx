import { CircularProgress } from '@mui/material';

export default function CenterLoading() {
  return (
    <Stack sx={{ width: '100%' }}>
      <CircularProgress />
    </Stack>
  );
}
