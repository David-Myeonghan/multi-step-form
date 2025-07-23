import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useInitializeStepQuery() {
  const { query, isReady, pathname, replace } = useRouter();

  // Initialise
  useEffect(() => {
    if (isReady === false) return;

    if (!query.step) {
      replace({ pathname: pathname, query: { step: 1 } }, undefined, {
        shallow: true,
      });
      return;
    }
  }, [isReady, query.step, pathname, replace]);
}
