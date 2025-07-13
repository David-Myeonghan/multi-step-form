import { Box, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { useRouter } from 'next/router';
import BasicInfo, { StepComponentCommonProps } from '@/steps/BasicInfo';
import Recommendation from '@/steps/Recommendation';
import Review from '@/steps/Review';
import Quotation from '@/steps/Quotation';
import SharingOption from '@/steps/SharingOption';
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
const StepComponentMap: Record<StepName, FC<StepComponentCommonProps>> = {
  BasicInfo: BasicInfo,
  Recommendation: Recommendation,
  Review: Review,
  Quotation: Quotation,
  SharingOption: SharingOption,
};
export default function Home() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepType>(STEP_LIST[0]);
  const currentStepIndex = STEP_LIST.findIndex(step => step.name === currentStep.name);

  const goToNextStep = () => {
    const nextStep = STEP_LIST[currentStepIndex + 1];

    if (nextStep === undefined) {
      return;
    }

    setCurrentStep(nextStep);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, step: nextStep.step },
      },
      undefined,
      { shallow: true },
    );
  };

  const goToPreviousStep = () => {
    const previousStep = STEP_LIST[currentStepIndex - 1];
    if (previousStep === undefined) {
      return;
    }

    setCurrentStep(previousStep);

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, step: previousStep.step },
      },
      undefined,
      { shallow: true },
    );
  };

  const StepComponent = StepComponentMap[currentStep.name];

  useEffect(() => {
    if (router.isReady === false) {
      return;
    }

    if (router.query.step) {
      const queryStep = +router.query.step;
      const queryStepIndex = STEP_LIST.findIndex(step => step.step === queryStep);
      if (queryStepIndex === -1) {
        setCurrentStep(STEP_LIST[0]);
        router.replace(
          {
            pathname: router.pathname,
            query: { ...router.query, step: 1 },
          },
          undefined,
          { shallow: true },
        );
        return;
      }
      setCurrentStep(STEP_LIST[queryStepIndex]);
    }
    if (!router.query.step) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, step: currentStep.step },
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
          {/* Title - TODO: object 이용해서 컴포넌트화 */}
          <Box>
            <Typography variant="h5">📚 도서 기본 정보</Typography>
            <Typography variant="subtitle1">Step {currentStep.step} / 5</Typography>
            <Typography variant="subtitle1">도서 기본 정보를 입력해주세요.</Typography>
          </Box>
          {/* Step */}
          <StepComponent onNext={goToNextStep} onPrevious={goToPreviousStep} />
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
