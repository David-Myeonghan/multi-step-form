import { Button, Stack } from '@mui/material';
import useStepNavigator from '@/hooks/useStepNavigator';
import CenterLoading from '@/components/CenterLoading';

interface FormActionProps {}

export default function FormAction({}: FormActionProps) {
  const { isLoading, isFirst, isLast, goNext, goPrevious } = useStepNavigator();

  if (isLoading) {
    return <CenterLoading />;
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
          onClick={goPrevious}
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
