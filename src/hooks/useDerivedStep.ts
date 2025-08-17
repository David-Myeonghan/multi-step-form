import { useRouter } from 'next/router';
import { STEP_LIST } from '@/hooks/useStepNavigator';

export default function useDerivedStep() {
  const { query, isReady } = useRouter();

  const stepString = Array.isArray(query.step) ? query.step[0] : query.step;
  const stepNumber = Number(stepString) || 1;

  const currentIndex = stepNumber - 1;
  const currentStep = STEP_LIST[currentIndex];

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === STEP_LIST.length - 1;

  const isLoading = isReady === false || !stepNumber;

  return { stepNumber, currentStep, isFirst, isLast, isLoading };
}
