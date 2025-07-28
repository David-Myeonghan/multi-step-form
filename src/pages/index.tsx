import { Paper, Stack } from '@mui/material';
import React from 'react';
import BasicInfo from '@/steps/BasicInfo/BasicInfo';
import Recommendation from '@/steps/Recommendation';
import Review from '@/steps/Review';
import Quotation from '@/steps/Quotation';
import SharingOption from '@/steps/SharingOption';
import useStepNavigator from '@/hooks/useStepNavigator';
import StepSwitcher from '@/components/StepSwitcher';
import StepHeader from '@/components/StepHeader';
import FormAction from '@/components/FormAction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RHFProvider from '@/components/RHF/RHFProvider';
import { MultiStepFormValues, schemasByStep } from '@/schemas';
import CenterLoading from '@/components/CenterLoading';
// 1024px 기준

export default function Home() {
  const { stepNumber, currentStep, isLoading } = useStepNavigator();

  const methods = useForm<MultiStepFormValues>({
    defaultValues: {
      title: '',
      author: '',
      readingStatus: 'WISHLIST',
      publishedAt: null,
      readingStartedAt: null,
      readingFinishedAt: null,
      rating: 0,
      review: '',
      // 다른 step 필드...
    },
    context: { stepNumber },
    resolver: (values, context, options) => {
      const { stepNumber } = context;
      console.log(stepNumber);
      const schema = schemasByStep[stepNumber as keyof typeof schemasByStep];
      console.log(schema);
      // 동적 변경

      return zodResolver(schema)(values, context, options);
    },
  });

  const handleSubmit = async (data: MultiStepFormValues) => {
    console.log(data);
    // const res = await submit(data);
  };

  if (isLoading) {
    return <CenterLoading />;
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <RHFProvider methods={methods} onSubmit={handleSubmit}>
        <Stack gap={3}>
          <StepHeader currentStep={currentStep.step} />

          <StepSwitcher
            value={stepNumber}
            cases={{
              1: <BasicInfo />,
              2: <Recommendation />, // 2 + 3
              // 3: <Review />,
              3: <Quotation />,
              4: <SharingOption />,
            }}
            fallback={<div>Error!</div>}
          />
          <FormAction />
        </Stack>
      </RHFProvider>
    </Paper>
  );
}
