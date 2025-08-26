import { Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export default function Success() {
  // GET submit data

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack gap={3}>
        <Stack>
          <Typography variant="h5">완료!</Typography>
          <Typography variant="subtitle1">모든 정보를 제출했습니다</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
