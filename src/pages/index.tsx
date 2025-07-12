import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import BasicInfo from '@/components/BasicInfo';
// 1024px 기준

type StepName = 'BasicInfo' | 'Recommendation' | 'Review' | 'Quotation' | 'SharingOption';
type StepType = { step: number; name: StepName };

const STEP_LIST: Array<StepType> = [
  { step: 1, name: 'BasicInfo' },
  { step: 2, name: 'Recommendation' },
  { step: 3, name: 'Review' },
  { step: 4, name: 'Quotation' },
  { step: 5, name: 'SharingOption' },
];
export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepType>(STEP_LIST[0]);

  const goToNextStep = (newStep: number) => {
    // setCurrentStep({ step: 2, name: 'Recommendation' });
    router.push(
      // ,or replace
      {
        pathname: router.pathname,
        query: { ...router.query, step: newStep },
      },
      undefined,
      { shallow: true },
    );
  };

  useEffect(() => {
    if (router.isReady === false) {
      return;
    }
    if (!router.query.step) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, step: currentStep.name },
        },
        undefined,
        { shallow: true },
      );
    }
  }, [router.isReady]);

  return (
    <>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack gap={3}>
          {/* Title */}
          <Box>
            <Typography variant="h5">📚 도서 기본 정보</Typography>
            <Typography variant="subtitle1">Step {currentStep.step} / 5</Typography>
            <Typography variant="subtitle1">도서 기본 정보를 입력해주세요.</Typography>
          </Box>
          {/* Step = 1 */}
          <BasicInfo onNext={() => setCurrentStep({ step: 2, name: 'Recommendation' })} />
        </Stack>
      </Paper>
    </>
  );
}

// 1 단계:
// 도서 기본 정보 - 이름, 저자, 출판 년,월,일
// 독서 상태
// --> 읽고 싶은 책 / 읽는 중 / 읽음 / 보류중
// --> 독서(할) 시작일, 독서 종료일 (독서 상태에 종속적)

// todo:
// how to step(1-5) -> validation -> 각 단계 UI
