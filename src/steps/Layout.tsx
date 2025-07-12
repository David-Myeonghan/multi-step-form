import { ReactNode } from 'react';
import { Stack } from '@mui/material';

export default function Layout({ children }: { children: ReactNode }) {
  return <Stack sx={{ padding: '32px' }}>{children}</Stack>;
}
