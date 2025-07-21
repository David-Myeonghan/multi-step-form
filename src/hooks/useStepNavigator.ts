import { useRouter } from 'next/router';
import { useEffect } from 'react';

type StepName = 'BasicInfo' | 'Recommendation' | 'Review' | 'Quotation' | 'SharingOption';
type StepType = { step: 1 | 2 | 3 | 4 | 5; name: StepName };

export const STEP_LIST: Array<StepType> = [
  { step: 1, name: 'BasicInfo' },
  { step: 2, name: 'Recommendation' },
  { step: 3, name: 'Review' },
  { step: 4, name: 'Quotation' },
  { step: 5, name: 'SharingOption' },
];

export default function useStepNavigator() {
  const { query, isReady, pathname, replace, push } = useRouter();

  const stepString = Array.isArray(query.step) ? query.step[0] : query.step;
  const stepNumber = Number(stepString) || 1;

  const currentIndex = stepNumber - 1;
  const currentStep = STEP_LIST[currentIndex];

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === STEP_LIST.length - 1;

  const isLoading = isReady === false || !stepNumber;

  const goTo = (newStep: number) => {
    push(
      {
        pathname,
        query: { ...query, step: newStep },
      },
      undefined,
      { shallow: true },
    );
  };

  const goNext = () => {
    if (isLast === false) {
      goTo(stepNumber + 1);
    }
  };

  const goPrevious = () => {
    if (isFirst === false) {
      goTo(stepNumber - 1);
    }
  };

  // Initialise
  useEffect(() => {
    if (isReady === false) return;

    if (!query.step) {
      replace({ pathname: pathname, query: { step: 1 } }, undefined, {
        shallow: true,
      });
      return;
    }
  }, [isReady, query.step]);

  return {
    stepNumber,
    currentStep,
    isFirst,
    isLast,
    isLoading,
    goNext,
    goPrevious,
  };
}
