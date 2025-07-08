import { useEffect, useState } from 'react';

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useDelayedQueryTrigger(delay: number) {
  const [shouldRun, setShouldRun] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldRun(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRun;
}
