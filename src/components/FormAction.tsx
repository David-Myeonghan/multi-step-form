import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';

interface FormActionProps {
  onPreviousClick: () => void;
}
export default function FormAction({ onPreviousClick }: FormActionProps) {
  const { query } = useRouter();
  const step = +query.step as number;

  if (!step) {
    return null;
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={{ width: '100%', paddingTop: 3, position: 'relative' }}
      gap={2}
    >
      {step !== 1 && (
        <Button
          onClick={onPreviousClick}
          variant="contained"
          sx={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          ⬅ 이전
        </Button>
      )}
      <Button type="submit" variant="contained" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
        {step === 5 ? '제출' : `다음 ➡`}
      </Button>
    </Stack>
  );
}
