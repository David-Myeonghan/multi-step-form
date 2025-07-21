import { Button, Stack } from '@mui/material';
import useStepNavigator from '@/hooks/useStepNavigator';

interface FormActionProps {
  onPreviousClick: () => void;
  // queryStep: number
}
export default function FormAction({ onPreviousClick }: FormActionProps) {
  const { isLoading, isFirst, isLast } = useStepNavigator();

  if (isLoading) {
    return null; // Loading
  }

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={{ width: '100%', paddingTop: 3, position: 'relative' }}
      gap={2}
    >
      {isFirst === false && (
        <Button
          onClick={onPreviousClick}
          variant="contained"
          sx={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          ⬅ 이전
        </Button>
      )}
      <Button type="submit" variant="contained" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
        {isLast ? '제출' : `다음 ➡`}
      </Button>
    </Stack>
  );
}
