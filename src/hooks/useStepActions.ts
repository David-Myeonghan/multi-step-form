import { useRouter } from 'next/router';

interface useStepActionsProps {
  isFirst: boolean;
  isLast: boolean;
  stepNumber: number;
}
export default function useStepActions({ isFirst, isLast, stepNumber }: useStepActionsProps) {
  const { query, pathname, push } = useRouter();

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

  return { goNext, goPrevious };
}
