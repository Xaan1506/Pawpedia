import { useEffect, useRef } from 'react';

function useInfiniteScroll(callback, hasMore = true) {
  const observerRef = useRef(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const currentObserverRef = observerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingRef.current) {
          loadingRef.current = true;
          callback().finally(() => {
            loadingRef.current = false;
          });
        }
      },
      {
        rootMargin: '100px',
      }
    );

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [callback, hasMore]);

  return observerRef;
}

export default useInfiniteScroll;