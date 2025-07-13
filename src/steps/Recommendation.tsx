import { StepComponentCommonProps } from '@/steps/BasicInfo';
import { useForm } from 'react-hook-form';
import FormAction from '@/components/FormAction';
import { Box, Stack } from '@mui/material';

export default function Recommendation({ onNext, onPrevious }: StepComponentCommonProps) {
  const { handleSubmit } = useForm();

  const handleNextClick = (data: unknown) => {
    onNext();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleNextClick)}>
      <Stack gap={2}>
        <Box gap={2}>Review</Box>
        <FormAction onPreviousClick={onPrevious} />
      </Stack>
    </form>
  );
}
