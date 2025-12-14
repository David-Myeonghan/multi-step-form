import { Paper, Stack } from '@mui/material';
import React from 'react';
import BasicInfo from '@/steps/BasicInfo/BasicInfo';
import Recommendation from '@/steps/Recommendation';
import QuotationSharing from '@/steps/QuotationSharing';
import useStepNavigator from '@/hooks/useStepNavigator';
import StepSwitcher from '@/components/StepSwitcher';
import StepHeader from '@/components/StepHeader';
import FormAction from '@/components/FormAction';
import { zodResolver } from '@hookform/resolvers/zod';
import RHFProvider from '@/components/RHF/RHFProvider';
import { MultiStepFormValues, schemasByStep } from '@/schemas';
import CenterLoading from '@/components/CenterLoading';
import { useRouter } from 'next/router';
import { allFormInfoAtom } from '@/Atom/allFormInfo';
import useFormWithStorage from '@/hooks/useFormWithStorage';
// 1024px 기준

export default function Home() {
  const router = useRouter();
  const { stepNumber, currentStep, isLoading } = useStepNavigator();

  const resolver = zodResolver(schemasByStep[stepNumber as keyof typeof schemasByStep] as any);

  const { methods, clearStorage } = useFormWithStorage<MultiStepFormValues>(allFormInfoAtom, {
    mode: 'onSubmit',
    shouldUnregister: false,
    defaultValues: {
      title: '',
      author: '',
      readingStatus: 'WISHLIST',
      publishedAt: null,
      readingStartedAt: null,
      readingFinishedAt: null,
      rating: 0,
      review: '',
      quotation: '',
      quotationPage: 1,
      totalPage: 1,
      isPublic: false,
    },
    resolver,
  });

  const handleSubmit = async (data: MultiStepFormValues) => {
    console.log(data);
    // const res = await submit(data); // POST
    await router.replace('submit/success');
    // if (res.success)
    clearStorage();
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
              2: <Recommendation />,
              3: <QuotationSharing />,
            }}
            fallback={<div>Error!</div>}
          />
          <FormAction />
        </Stack>
      </RHFProvider>
    </Paper>
  );
}
