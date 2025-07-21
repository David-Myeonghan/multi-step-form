import { CircularProgress, Paper, Stack } from '@mui/material';
import React from 'react';
import BasicInfo from '@/steps/BasicInfo';
import Recommendation from '@/steps/Recommendation';
import Review from '@/steps/Review';
import Quotation from '@/steps/Quotation';
import SharingOption from '@/steps/SharingOption';
import useStepNavigator from '@/hooks/useStepNavigator';
import StepSwitcher from '@/components/StepSwitcher';
import StepHeader from '@/components/StepHeader';
// 1024px 기준

export default function Home() {
  const { stepNumber, currentStep, isLoading } = useStepNavigator();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack gap={3}>
        <StepHeader currentStep={currentStep.step} />

        <StepSwitcher
          value={stepNumber}
          cases={{
            1: <BasicInfo />,
            2: <Recommendation />,
            3: <Review />,
            4: <Quotation />,
            5: <SharingOption />,
          }}
          fallback={<div>Error!</div>}
        />
      </Stack>
    </Paper>
  );
}

// 1 단계:
// 도서 기본 정보 - 이름, 저자, 출판 년,월,일
// 독서 상태
// --> 읽고 싶은 책 / 읽는 중 / 읽음 / 보류중
// --> 독서(할) 시작일, 독서 종료일 (독서 상태에 종속적)

// todo:
// how to step(1-5) -> validation -> 각 단계 UI
