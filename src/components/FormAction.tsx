import { useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import useStepNavigator from '@/hooks/useStepNavigator';
import CenterLoading from '@/components/CenterLoading';
import { useFormContext } from 'react-hook-form';
import { useAtom } from 'jotai/index';
import { allFormInfoAtom } from '@/Atom/allFormInfo';

interface FormActionProps {}

export default function FormAction({}: FormActionProps) {
  const { trigger, getValues, reset } = useFormContext();
  const { isLoading, isFirst, isLast, goPrevious, goNext, stepNumber } = useStepNavigator();
  const [allFormInfoStorage, setBasicInfo] = useAtom(allFormInfoAtom);

  const handleNextClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      const currentInfo = getValues();
      setBasicInfo(prev => ({ ...prev, ...currentInfo }));
      goNext();
    }
  };

  const handlePrevClick = () => {
    const currentInfo = getValues();
    setBasicInfo(prev => ({ ...prev, ...currentInfo }));
    goPrevious();
  };

  const buttonProps = isLast ? { type: 'submit' } : { onClick: handleNextClick };

  useEffect(() => {
    if (
      typeof allFormInfoStorage === 'object' &&
      allFormInfoStorage !== null &&
      Object.keys(allFormInfoStorage).length > 0
    ) {
      reset(allFormInfoStorage);
    }
  }, [stepNumber]);

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
          onClick={handlePrevClick}
          variant="contained"
          sx={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          ⬅ 이전
        </Button>
      )}

      <Button
        {...buttonProps}
        variant="contained"
        sx={{ position: 'absolute', bottom: 0, right: 0 }}
      >
        {isLast ? '제출' : '다음 ➡'}
      </Button>
    </Stack>
  );
}
