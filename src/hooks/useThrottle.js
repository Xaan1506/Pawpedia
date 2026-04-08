import { useRef, useCallback } from 'react';

function useThrottle(func, delay) {
  const lastCallRef = useRef(0);

  const throttledFunction = useCallback((...args) => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      return func(...args);
    }
  }, [func, delay]);

  return throttledFunction;
}

export default useThrottle;