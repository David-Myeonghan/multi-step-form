import useInitializeStepQuery from '@/hooks/useInitializeStepQuery';
import useDerivedStep from '@/hooks/useDerivedStep';
import useStepActions from '@/hooks/useStepActions';

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
  const { stepNumber, currentStep, isFirst, isLast, isLoading } = useDerivedStep();
  const { goNext, goPrevious } = useStepActions({ isFirst, isLast, stepNumber });

  useInitializeStepQuery();

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
