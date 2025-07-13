import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';

interface FormActionProps {
  onPreviousClick: () => void;
  // queryStep: number
}
export default function FormAction({ onPreviousClick }: FormActionProps) {
  const { query, isReady } = useRouter();
  const rawStep = Array.isArray(query.step) ? query.step[0] : query.step;
  const queryStep = Number(rawStep) || 1;

  if (isReady === false || !queryStep) {
    return null; // Loading
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={{ width: '100%', paddingTop: 3, position: 'relative' }}
      gap={2}
    >
      {queryStep !== 1 && (
        <Button
          onClick={onPreviousClick}
          variant="contained"
          sx={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          ⬅ 이전
        </Button>
      )}
      <Button type="submit" variant="contained" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
        {queryStep === 5 ? '제출' : `다음 ➡`}
      </Button>
    </Stack>
  );
}
