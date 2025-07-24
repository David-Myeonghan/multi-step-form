import { CircularProgress, Paper, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import BasicInfo from '@/steps/BasicInfo';
import Recommendation from '@/steps/Recommendation';
import Review from '@/steps/Review';
import Quotation from '@/steps/Quotation';
import SharingOption from '@/steps/SharingOption';
import useStepNavigator from '@/hooks/useStepNavigator';
import StepSwitcher from '@/components/StepSwitcher';
import StepHeader from '@/components/StepHeader';
import FormAction from '@/components/FormAction';
import { useForm } from 'react-hook-form';
import { BasicInfoFormValues, basicInfoSchema } from '@/schemas/BasicInfoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai/index';
import { basicInfoAtom } from '@/Atom/BasinInfo';
import RHFProvider from '@/components/RHF/RHFProvider';
// 1024px 기준

export default function Home() {
  const { stepNumber, currentStep, isLoading, goNext } = useStepNavigator();
  // const [basicInfoStorage, setBasicInfo] = useAtom(basicInfoAtom);

  const methods = useForm<BasicInfoFormValues>({
    defaultValues: {
      title: '',
      author: '',
      readingStatus: 'WISHLIST',
      publishedAt: null,
      readingStartedAt: null,
      readingFinishedAt: null,
    },
    shouldUnregister: true,
    resolver: zodResolver(basicInfoSchema),
  });
  const { control, reset } = methods;

  const handleSubmit = async data => {
    console.log(data);

    if (isLast === false) {
      goNext();
    } else {
      // await submit()
    }
  };

  // useEffect(() => {
  //   if (
  //     typeof basicInfoStorage === 'object' &&
  //     basicInfoStorage !== null &&
  //     Object.keys(basicInfoStorage).length > 0
  //   ) {
  //     reset(basicInfoStorage);
  //   }
  // }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack gap={3}>
        <StepHeader currentStep={currentStep.step} />

        <RHFProvider methods={methods} onSubmit={handleSubmit}>
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
          <FormAction />
        </RHFProvider>
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
